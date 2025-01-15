package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.WorkoutPlan;
import GymFitnessTrackerApplication.model.dto.WorkoutDTO;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
import GymFitnessTrackerApplication.model.dto.response.WorkoutPlanResponse;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.WorkoutPlanService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class WorkoutController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private MyUserService myUserService;
    @Autowired
    private WorkoutPlanService workoutPlanService;

    //treba dodat WorkoutPlanResponse klasu i popuniti ju
    @GetMapping("/workout-plans")
    public ResponseEntity<?> getAllWorkoutPlansForUser(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.trim().substring(7));
        Set<WorkoutPlanResponse> allWorkoutPlans=  workoutPlanService.getUserCreatedWorkoutPlans(email);
        return ResponseEntity.status(HttpStatus.OK).body(allWorkoutPlans);
    }

    @GetMapping("/workout-plans/created-by")
    public ResponseEntity<?> getAllCreatedBy(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.trim().substring(7));
        Set<WorkoutPlanResponse> allWorkoutPlans = workoutPlanService.getUserCreatedWorkoutPlans(email);
        return ResponseEntity.status(HttpStatus.OK).body(allWorkoutPlans);
    }

    @GetMapping("/workout-plans/public")
    public ResponseEntity<?> getAllPublicWorkoutPlans() {
        Set<WorkoutPlanResponse> publicWorkoutPlans = workoutPlanService.getPublicWorkoutPlans();
        return ResponseEntity.status(HttpStatus.OK).body(publicWorkoutPlans);
    }

    @PostMapping("/create-workout-plan")
    public ResponseEntity<?> createWorkoutPlan(@RequestParam("name") String name,
                                               @RequestParam("description") String description,
                                               @RequestParam("image") MultipartFile image,
                                               @RequestParam("userId") Long userId,
                                               @RequestParam("createdById") Long createdByUserId,
                                               @RequestParam("originalWorkoutPlanId") String originalWorkoutPlanId,
                                               @RequestParam("workouts") String workoutsJson
    ) throws JsonProcessingException {
        Long origigiWorkoutPlanId;
        try{ origigiWorkoutPlanId = Long.parseLong(originalWorkoutPlanId); }
        catch (NumberFormatException e) { origigiWorkoutPlanId = null; }
        ObjectMapper objectMapper = new ObjectMapper();
        List<WorkoutDTO> workouts = objectMapper.readValue(workoutsJson, new TypeReference<List<WorkoutDTO>>(){});

        WorkoutPlanForm workoutPlanForm = new WorkoutPlanForm(name, description, image, userId, createdByUserId, origigiWorkoutPlanId, workouts);

        String imageUrl = workoutPlanService.createNewWorkoutPlan(workoutPlanForm);
        return ResponseEntity.status(HttpStatus.OK).body(imageUrl);
    }

    @GetMapping("/user/current-workout-plan")
    public ResponseEntity<?> getCurrentUserWorkoutPlan(@RequestHeader("Authorization") String token){
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        WorkoutPlanResponse activeWorkoutPlan = workoutPlanService.getActiveWorkoutPlan(user);
        if(activeWorkoutPlan==null){
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There is currently no active workout plan.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(activeWorkoutPlan);
    }

    @GetMapping("/workout-plans/{id}")
    public ResponseEntity<?> specificanWorkout(@PathVariable Long id){
        WorkoutPlanResponse workoutPlan = workoutPlanService.getWorkoutPlanById(id);
        return ResponseEntity.status(HttpStatus.OK).body(workoutPlan);
    }

}
