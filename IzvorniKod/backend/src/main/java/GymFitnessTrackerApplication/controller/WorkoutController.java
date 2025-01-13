package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.WorkoutPlan;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.WorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/workout-plan")
    public ResponseEntity<?> createWorkoutPlan(@RequestHeader("Authorization") String token, @RequestBody WorkoutPlanForm workoutPlanForm) {
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        workoutPlanService.addWorkoutPlan(user, workoutPlanForm);
        return ResponseEntity.status(HttpStatus.OK).body("Created workout plan for the user");
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
