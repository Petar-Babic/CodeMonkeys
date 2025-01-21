package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.ExerciseForm;
import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.MuscleGroupDTO;
import GymFitnessTrackerApplication.service.ExerciseService;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.WorkoutPlanService;
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
        exerciseService.createExercise(user, exerciseForm);
        return ResponseEntity.status(HttpStatus.OK).body("Exercise successfully created.");
    }

    @DeleteMapping("/exercise/{id}")
    public ResponseEntity<?> deleteExercise(@PathVariable Long id){
        exerciseService.deleteExercise(id);
        return ResponseEntity.status(HttpStatus.OK).body("Exercise successfully deleted.");
    }

    @PutMapping("/exercise/{id}")
    public ResponseEntity<?> updateExercise(@PathVariable Long id, @RequestBody ExerciseForm exerciseForm){
        exerciseService.updateExercise(id, exerciseForm);
        return ResponseEntity.status(HttpStatus.OK).body("Exercise successfully updated.");
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


    @PostMapping("/create-muscle-group")
    public ResponseEntity<?> createMuscleGroup(@RequestBody MuscleGroupDTO muscleGroupDTO) {
        exerciseService.createMuscleGroup(muscleGroupDTO);
        return ResponseEntity.status(HttpStatus.OK).body("Muscle Group successfully created.");
    }

    @GetMapping("/all-muscle-groups")
    public ResponseEntity<?> getAllMuscleGroups(){
        Set<MuscleGroupDTO> muscleGroups = exerciseService.listAllMuscleGroups();
        return ResponseEntity.status(HttpStatus.OK).body(muscleGroups);
    }
}
