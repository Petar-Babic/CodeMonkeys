package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.response.WorkoutPlanResponse;
import GymFitnessTrackerApplication.service.WorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    @GetMapping("/")
    public ResponseEntity<?> welcome() {
        return ResponseEntity.ok("Welcome to GymFitnessTracker Application ");
    }

    @GetMapping("/workout-plans")
    public ResponseEntity<?> allWorkoutPlans() {
        Set<WorkoutPlanResponse> response = workoutPlanService.listAllWorkoutPlans();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/exercises")
    public ResponseEntity<?> allExercises() {
        List<ExerciseResponse> response = workoutPlanService.listAllExercises();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/exercise")
    public ResponseEntity<?> approveExercise(){
        //dodati da se azurira
        return ResponseEntity.status(HttpStatus.OK).body("Exercise successfully approved");
    }

    //prebaciti f-ju kreiranja muscle grupa ovdje



}