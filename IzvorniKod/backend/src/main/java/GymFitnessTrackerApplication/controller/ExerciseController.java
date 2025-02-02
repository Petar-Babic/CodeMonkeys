package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.ExerciseForm;
import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.response.PerformedExerciseResponse;
import GymFitnessTrackerApplication.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/api")
public class ExerciseController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private MyUserService myUserService;
    @Autowired
    private ExerciseService exerciseService;

    @PostMapping("/create-exercise")
    public ResponseEntity<?> createExercise(@RequestHeader("Authorization") String token, @RequestBody ExerciseForm exerciseForm){
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        ExerciseResponse exercise = exerciseService.createExercise(user, exerciseForm);
        return ResponseEntity.status(HttpStatus.OK).body(exercise);
    }

    @DeleteMapping("/exercises/{id}")
    public ResponseEntity<?> deleteExercise(@RequestHeader("Authorization") String token, @PathVariable Long id){
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        exerciseService.deleteExercise(id, user);
        return ResponseEntity.status(HttpStatus.OK).body("Exercise successfully deleted.");
    }

    @PutMapping("/exercises/{id}")
    public ResponseEntity<?> updateExercise(@RequestHeader("Authorization") String token,
                                            @PathVariable Long id, @RequestBody ExerciseForm exerciseForm){
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        ExerciseResponse response =  exerciseService.updateExercise(id, exerciseForm, user);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("exercises/{id}")
    public ResponseEntity<?> getExerciseById(@PathVariable Long id) {
        ExerciseResponse exercise = exerciseService.getExerciseById(id);
        return ResponseEntity.status(HttpStatus.OK).body(exercise);
    }


    @GetMapping("all-exercises/created-by-user")
    public ResponseEntity<?> getAllExercisesCreatedByUser(@RequestHeader("Authorization") String token){
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        List<ExerciseResponse> exercises = exerciseService.listAllExercisesCreatedByUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(exercises);
    }

    @GetMapping("/all-exercises/public")
    public ResponseEntity<?> getAllExercisesPublic(){
        List<ExerciseResponse> publicExercises = exerciseService.listAllApprovedExercises();
        return ResponseEntity.status(HttpStatus.OK).body(publicExercises);
    }

    @GetMapping("exercises/history/{id}")
    public ResponseEntity<?> getExercisesHistory(@RequestHeader("Authorization") String token, @PathVariable Long id){
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Set<PerformedExerciseResponse> response = exerciseService.listExerciseHistoryForUser(user, id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
