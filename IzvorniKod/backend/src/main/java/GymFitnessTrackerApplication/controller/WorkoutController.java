package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.WorkoutPlan;
import GymFitnessTrackerApplication.model.dto.WorkoutDTO;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
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

@RestController
@RequestMapping("/api")
public class WorkoutController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private MyUserService myUserService;
    @Autowired
    private WorkoutPlanService workoutPlanService;

    @GetMapping("/workout-plans")
    public ResponseEntity<?> getAllWorkoutPlansForUser(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        List<WorkoutPlan> allWorkoutPlans=  workoutPlanService.getUserWorkoutPlans(user);
        return ResponseEntity.status(HttpStatus.OK).body(allWorkoutPlans);
    }

    @GetMapping("/workout-plans/public")
    public ResponseEntity<?> getAllPublicWorkoutPlans() {
        List<WorkoutPlan> publicWorkoutPlans = workoutPlanService.getPublicWorkoutPlans();
        return ResponseEntity.status(HttpStatus.OK).body(publicWorkoutPlans);
    }

    @PostMapping("/create-workout-plan")
    public ResponseEntity<?> createWorkoutPlan(@RequestParam("name") String name,                           // Text field for plan name
                                               @RequestParam("description") String description,             // Text field for plan description
                                               @RequestParam("image") MultipartFile image,                  // File upload for the image
                                               @RequestParam("userId") Long userId,                         // User ID
                                               @RequestParam("createdById") Long createdByUserId,       // Creator User ID
                                               @RequestParam("workouts") String workoutsJson                // JSON string for workouts
    ) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        List<WorkoutDTO> workouts = objectMapper.readValue(workoutsJson, new TypeReference<List<WorkoutDTO>>(){});

        // Create the WorkoutPlanForm using the parsed data
        WorkoutPlanForm workoutPlanForm = new WorkoutPlanForm(name, description, image, userId, createdByUserId, workouts);

        String imageUrl = workoutPlanService.createNewWorkoutPlan(workoutPlanForm);
        return ResponseEntity.status(HttpStatus.OK).body(imageUrl);
    }

    @GetMapping("/workout-plans/{id}")
    public String specificanWorkout(@PathVariable String id){
        return id.toString()+". workout";
    }

    @GetMapping("/user/current-workout-plan")
    public String trenutniplan(){
        return "trenutan";
    }
}
