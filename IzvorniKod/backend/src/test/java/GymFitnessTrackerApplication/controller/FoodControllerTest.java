package GymFitnessTrackerApplication.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import GymFitnessTrackerApplication.model.domain.Food;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.FoodForm;
import GymFitnessTrackerApplication.model.dto.response.FoodResponse;
import GymFitnessTrackerApplication.service.FoodService;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyUserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

class FoodControllerTest {
    @Mock
    private JwtService jwtService;

    @Mock
    private MyUserService myUserService;

    @Mock
    private FoodService foodService;

    @InjectMocks
    private FoodController foodController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSearchFood_Success() {
        // Arrange
        String token = "Bearer valid.jwt.token";
        String email = "user@example.com";
        String barcode = "123456789012";

        // Mock user data
        MyUser user = new MyUser();
        user.setEmail(email);

        // Create the Food object
        Food food = new Food(new FoodForm(
                "Test Food",
                200.0f,
                "g",
                100,
                5.0f,
                30.0f,
                10.0f,
                true
        ));

        // Spy on the Food object to mock only specific methods
        Food foodSpy = spy(food);

        // Mock the getId() method to return a non-null value
        when(foodSpy.getId()).thenReturn(1L);  // Mock the ID to return 1L

        // Mock the service calls
        when(jwtService.extractEmail("valid.jwt.token")).thenReturn(email);
        when(myUserService.getMyUser(email)).thenReturn(user);
        when(foodService.createFoodFromBarcode(user, barcode)).thenReturn(foodSpy);

        // Act
        ResponseEntity<?> response = foodController.searchFood(token, barcode);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertTrue(response.getBody() instanceof FoodResponse);

        FoodResponse foodResponse = (FoodResponse) response.getBody();
        assertEquals(food.getName(), foodResponse.getName());
        assertEquals(food.getCalories(), foodResponse.getCalories());
        assertEquals(food.getCarbs(), foodResponse.getCarbs());
        assertEquals(food.getFat(), foodResponse.getFats());
        assertEquals(food.getProtein(), foodResponse.getProtein());
        assertEquals(food.getUnit(), foodResponse.getUnit());
        assertEquals(food.getDefaultNumber(), foodResponse.getDefaultNumber());

        // Verify the mock interactions
        verify(jwtService, times(1)).extractEmail("valid.jwt.token");
        verify(myUserService, times(1)).getMyUser(email);
        verify(foodService, times(1)).createFoodFromBarcode(user, barcode);
    }



    @Test
    void testSaveFood() {
        // Arrange
        String token = "Bearer valid.jwt.token";
        String email = "test@example.com";
        FoodForm form = new FoodForm();
        MyUser user = new MyUser();
        Food food = new Food();
        food.setName("Pizza");
        food.setCalories(300);
        food.setCarbs(40);
        food.setFat(10);
        food.setProtein(12);
        food.setDefaultNumber(1);
        food.setApproved(true);

        // Spy on the Food object to mock specific methods (e.g., getId())
        Food foodSpy = spy(food);

        // Mock the getId() method to return a non-null value (1L)
        when(foodSpy.getId()).thenReturn(1L);

        // Prepare the expected response
        FoodResponse expectedResponse = new FoodResponse(foodSpy);

        // Mock the service calls
        when(jwtService.extractEmail("valid.jwt.token")).thenReturn(email);
        when(myUserService.getMyUser(email)).thenReturn(user);
        when(foodService.createFoodFromForm(user, form)).thenReturn(foodSpy);

        // Act
        ResponseEntity<?> response = foodController.saveFood(form, token);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof FoodResponse);

        // Extract the actual response body
        FoodResponse actualResponse = (FoodResponse) response.getBody();

        // Manually assert that the fields match
        assertEquals(expectedResponse.getName(), actualResponse.getName());
        assertEquals(expectedResponse.getCalories(), actualResponse.getCalories());
        assertEquals(expectedResponse.getCarbs(), actualResponse.getCarbs());
        assertEquals(expectedResponse.getFats(), actualResponse.getFats());
        assertEquals(expectedResponse.getProtein(), actualResponse.getProtein());
        assertEquals(expectedResponse.getDefaultNumber(), actualResponse.getDefaultNumber());
        assertEquals(expectedResponse.isApproved(), actualResponse.isApproved());

        // Verify the mock interactions
        verify(jwtService, times(1)).extractEmail("valid.jwt.token");
        verify(myUserService, times(1)).getMyUser(email);
        verify(foodService, times(1)).createFoodFromForm(user, form);
    }
}