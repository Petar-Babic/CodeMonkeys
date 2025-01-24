package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.response.WorkoutPlanResponse;
import GymFitnessTrackerApplication.service.ExerciseService;
import GymFitnessTrackerApplication.service.WorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private WorkoutPlanService workoutPlanService;
    @Autowired
    private ExerciseService exerciseService;
    

    @GetMapping("/workout-plans")
    public ResponseEntity<?> allWorkoutPlans() {
        Set<WorkoutPlanResponse> response = workoutPlanService.listAllWorkoutPlans();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all-exercises")
    public ResponseEntity<?> getAllExercises(){
        List<ExerciseResponse> exercises = exerciseService.listAllExercises();
        return ResponseEntity.status(HttpStatus.OK).body(exercises);
    }

    @PutMapping("/exercise/{id}")
    public ResponseEntity<?> approveExercise(@PathVariable Long id) {
        exerciseService.approveExercise(id);
        return ResponseEntity.status(HttpStatus.OK).body("Exercise successfully approved");
    }


}
