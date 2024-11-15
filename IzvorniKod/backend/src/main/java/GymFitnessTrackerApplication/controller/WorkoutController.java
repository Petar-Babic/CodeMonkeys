package GymFitnessTrackerApplication.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class WorkoutController {

    @GetMapping("/workout-plans")
    public String sviWorkout(){
        return "povlacim sve workouts";
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
