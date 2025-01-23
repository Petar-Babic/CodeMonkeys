package GymFitnessTrackerApplication.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TrainerController {

    @GetMapping("/api/trainers")
    public ResponseEntity<?> getAllTrainers(){
        return ResponseEntity.ok(200);
    }
}
