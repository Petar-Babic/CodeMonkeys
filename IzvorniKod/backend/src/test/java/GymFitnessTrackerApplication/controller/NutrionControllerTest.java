package GymFitnessTrackerApplication.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import GymFitnessTrackerApplication.controller.NutrionController;
import GymFitnessTrackerApplication.exception.AdminRestrictedException;
import GymFitnessTrackerApplication.exception.NoNutrionPlanException;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.domain.Role;
import GymFitnessTrackerApplication.model.dto.forms.NutrionPlanForm;
import GymFitnessTrackerApplication.model.dto.response.NutrionPlanResponse;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.NutrionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

public class NutrionControllerTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private MyUserService myUserService;

    @Mock
    private NutrionService myNutrionService;

    @InjectMocks
    private NutrionController nutritionPlanController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }


    // GOTOV
    @Test
    void testGetNutritionPlan_Success() {
        // Arrange
        String token = "Bearer valid.jwt.token";
        String email = "test@example.com";

        MyUser user = new MyUser();
        user.setId(1L); // Ensure user ID is set
        user.setEmail(email);
        user.setRole(Role.USER); // Set the Role to avoid null issues

        NutrionPlan plan = new NutrionPlan();
        plan.setId(1L); // Set ID to avoid null issues
        plan.setCalories(2000);
        plan.setMyUser(user); // Ensure the NutrionPlan is linked to MyUser

        NutrionPlanResponse expectedResponse = new NutrionPlanResponse(plan);

        when(jwtService.extractEmail("valid.jwt.token")).thenReturn(email);
        when(myUserService.getMyUser(email)).thenReturn(user);
        when(myNutrionService.getMyPlan(user)).thenReturn(plan);

        // Act
        ResponseEntity<?> response = nutritionPlanController.getNutrionPlan(token);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof NutrionPlanResponse);

        NutrionPlanResponse actualResponse = (NutrionPlanResponse) response.getBody();
        assertEquals(expectedResponse.getId(), actualResponse.getId());
        assertEquals(expectedResponse.getCalories(), actualResponse.getCalories());

        verify(jwtService, times(1)).extractEmail("valid.jwt.token");
        verify(myUserService, times(1)).getMyUser(email);
        verify(myNutrionService, times(1)).getMyPlan(user);
    }


    // gotov
    @Test
    void testGetNutritionPlan_InvalidToken() {
        // Arrange
        String token = "Bearer invalid.jwt.token";

        when(jwtService.extractEmail("invalid.jwt.token")).thenThrow(new RuntimeException("Invalid token"));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            nutritionPlanController.getNutrionPlan(token);
        });

        assertEquals("Invalid token", exception.getMessage());

        verify(jwtService, times(1)).extractEmail("invalid.jwt.token");
        verifyNoInteractions(myUserService);
        verifyNoInteractions(myNutrionService);
    }


    /// RADI
    @Test
    void testUpdateNutritionPlan_UserNotTrainer_ThrowsAdminRestrictedException() {
        // Arrange
        String token = "Bearer valid.jwt.token";
        String email = "test@example.com";
        String planId = "1";

        // Mock a NutrionPlanForm with values to update
        NutrionPlanForm form = new NutrionPlanForm(2500f, 150f, 300f, 80f, "2025-01-01", "2025-12-31");

        // Create a mock MyUser object with a non-trainer role
        MyUser user = new MyUser();
        user.setId(2L);  // User ID does not match "createdBy"
        user.setEmail(email);
        user.setRole(Role.USER);  // Role is not TRAINER

        MyUser user2 = new MyUser();
        user2.setId(3L);  // User ID does not match "createdBy"
        user2.setEmail(email+"n");
        user2.setRole(Role.USER);  // Role is not TRAINER

        // Create a mock NutrionPlan object
        NutrionPlan existingPlan = new NutrionPlan();
        existingPlan.setId(1L);  // Plan ID
        existingPlan.setMyUser(user2);
        existingPlan.setCreatedBy("2");  // "createdBy" does not match user ID

        // Mock service methods
        when(jwtService.extractEmail("valid.jwt.token")).thenReturn(email);
        when(myUserService.getMyUser(email)).thenReturn(user);
        when(myNutrionService.getPlanFromId(planId)).thenReturn(existingPlan);

        // Act & Assert
        AdminRestrictedException exception = assertThrows(
                AdminRestrictedException.class,
                () -> nutritionPlanController.updateNutrionPlan(form, token, planId)
        );

        // Verify the exception message
        assertEquals("USER nije trener", exception.getMessage());

        // Verify method invocations
        verify(jwtService, times(1)).extractEmail("valid.jwt.token");
        verify(myUserService, times(1)).getMyUser(email);
        verify(myNutrionService, times(1)).getPlanFromId(planId);
        verify(myNutrionService, never()).updateNutrionPlan(any(), any());  // Ensure update was not called
    }




    //gotovo
    @Test
    void testUpdateNutritionPlan_PlanNotFound() {
        // Arrange
        String token = "Bearer valid.jwt.token";
        String email = "test@example.com";
        String planId = "1";

        // Create a NutrionPlanForm with values to update
        NutrionPlanForm form = new NutrionPlanForm(2500f, 150f, 300f, 80f, "2025-01-01", "2025-12-31");

        // Mock services
        MyUser user = new MyUser();
        user.setId(1L);
        user.setEmail(email);

        when(jwtService.extractEmail("valid.jwt.token")).thenReturn(email);
        when(myUserService.getMyUser(email)).thenReturn(user);
        when(myNutrionService.getPlanFromId(planId))
                .thenThrow(new NoNutrionPlanException("NO existing plan to update")); // Throw exception here

        // Act & Assert
        NoNutrionPlanException exception = assertThrows(NoNutrionPlanException.class, () -> {
            nutritionPlanController.updateNutrionPlan(form, token, planId);
        });

        assertEquals("NO existing plan to update", exception.getMessage()); // Ensure correct exception message is thrown

        // Verify interactions
        verify(jwtService, times(1)).extractEmail("valid.jwt.token");
        verify(myUserService, times(1)).getMyUser(email);
        verify(myNutrionService, times(1)).getPlanFromId(planId);
        verify(myNutrionService, times(0)).updateNutrionPlan(any(), any()); // Ensure update was NOT called
    }

    //GOTOVO
    @Test
    void testPostNutritionPlan_UserNotFound() {
        // Arrange
        String token = "Bearer valid.jwt.token";
        String email = "test@example.com";

        // Create a NutrionPlanForm with values to post
        NutrionPlanForm form = new NutrionPlanForm(2500f, 150f, 300f, 80f, "2025-01-01", "2025-12-31");

        // Mock services
        MyUser user = new MyUser();
        user.setId(1L);
        user.setEmail(email);

        // Mock the jwtService and myUserService
        when(jwtService.extractEmail("valid.jwt.token")).thenReturn(email);
        when(myUserService.getMyUser(email)).thenReturn(user);  // Simulate user found

        // Simulate the case where the plan is not created
        when(myNutrionService.createNutrionPlan(user, form)).thenThrow(new RuntimeException("Error creating nutrition plan"));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            nutritionPlanController.postNutrionPlan(form, token);
        });

        assertTrue(exception.getMessage().contains("Error creating nutrition plan"));

        // Verify interactions
        verify(jwtService, times(1)).extractEmail("valid.jwt.token");
        verify(myUserService, times(1)).getMyUser(email);
        verify(myNutrionService, times(1)).createNutrionPlan(user, form);  // Ensure plan creation was attempted
    }


    //GOTOVO
    @Test
    void testPostNutritionPlan_Success() {
        // Arrange
        String token = "Bearer valid.jwt.token";
        String email = "test@example.com";

        // Create a NutrionPlanForm with values to post
        NutrionPlanForm form = new NutrionPlanForm(2500f, 150f, 300f, 80f, "2025-01-01", "2025-12-31");

        // Mock services
        MyUser user = new MyUser();
        user.setId(1L);
        user.setEmail(email);
        user.setRole(Role.USER);  // Set the role to USER

        // Create a mock NutrionPlan object and populate it with values from the form
        NutrionPlan createdPlan = new NutrionPlan();
        createdPlan.setId(1L);  // Set the plan ID after creation
        createdPlan.setMyUser(user);  // Set the user to avoid null user error
        createdPlan.setCalories(form.getCalories());  // Set calories from the form
        createdPlan.setProtein(form.getProtein());  // Set protein from the form
        createdPlan.setCarbs(form.getCarbs());  // Set carbs from the form
        createdPlan.setFat(form.getFat());  // Set fat from the form
        createdPlan.setStartDate(LocalDate.parse(form.getStartDate()));  // Set start date from the form
        createdPlan.setEndDate(LocalDate.parse(form.getEndDate()));  // Set end date from the form

        // Mock service methods
        when(jwtService.extractEmail("valid.jwt.token")).thenReturn(email);
        when(myUserService.getMyUser(email)).thenReturn(user);
        when(myNutrionService.createNutrionPlan(user, form)).thenReturn(createdPlan);

        // Mock the removeCurrentPlan method to return a boolean (e.g., true)
       // when(myNutrionService.removeCurrentPlan(user)).thenReturn(true);

        // Act
        ResponseEntity<?> response = nutritionPlanController.postNutrionPlan(form, token);

        // Assert
        assertEquals(200, response.getStatusCodeValue());  // Status should be OK (200)
        assertNotNull(response.getBody());  // Response body should not be null
        assertTrue(response.getBody() instanceof NutrionPlanResponse);  // Response should be of type NutrionPlanResponse

        NutrionPlanResponse responseBody = (NutrionPlanResponse) response.getBody();
        assertEquals("1", responseBody.getId());  // Check that the ID is set correctly
        assertEquals("1", responseBody.getUserId());  // Check the user ID
        assertEquals(2500f, responseBody.getCalories(), 0.01f);  // Check calories
        assertEquals(150f, responseBody.getProtein(), 0.01f);  // Check protein
        assertEquals(300f, responseBody.getCarbs(), 0.01f);  // Check carbs
        assertEquals(80f, responseBody.getFat(), 0.01f);  // Check fat
        assertEquals("2025-01-01", responseBody.getStartDate().toString());  // Check start date
        assertEquals("2025-12-31", responseBody.getEndDate().toString());  // Check end date

        // Verify the service methods were called correctly
        verify(jwtService, times(1)).extractEmail("valid.jwt.token");
        verify(myUserService, times(1)).getMyUser(email);
        verify(myNutrionService, times(1)).createNutrionPlan(user, form);
        //verify(myNutrionService, times(1)).removeCurrentPlan(user);  // Verify removeCurrentPlan was called
    }
}