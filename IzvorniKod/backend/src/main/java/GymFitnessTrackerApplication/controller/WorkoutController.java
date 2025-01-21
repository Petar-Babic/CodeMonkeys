package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.ExerciseForm;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutSessionForm;
import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.response.WorkoutSessionResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.DateRangeDTO;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.MuscleGroupDTO;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.WorkoutDTO;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
import GymFitnessTrackerApplication.model.dto.response.WorkoutPlanResponse;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.WorkoutPlanService;
import GymFitnessTrackerApplication.service.WorkoutSessionService;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.text.SimpleDateFormat;

@RestController
@RequestMapping("/api")
public class WorkoutController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private MyUserService myUserService;
    @Autowired
    private WorkoutPlanService workoutPlanService;
    @Autowired
    private WorkoutSessionService workoutSessionService;

    @GetMapping("/workout-plans")
    public ResponseEntity<?> getAllWorkoutPlansForUser(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.trim().substring(7));
        Set<WorkoutPlanResponse> allWorkoutPlans=  workoutPlanService.getUsersWorkoutPlans(email);
        return ResponseEntity.status(HttpStatus.OK).body(allWorkoutPlans);
    }

    //mozda dodati u endpoint {id} i tako vratiti za tog usera, ako user koji to trazi nije taj navedeni u {id} onda vratiti samo public od tog
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

    // TODO: Add endpoint for getting workout plan by id
    // @GetMapping("/workout-plans/{id}")

    // TODO: Add endpoint for getting all workout plans for admin
    // @GetMapping("/workout-plans")

    // TODO: Add endpoint for deleting workout plan for admin
    // @DeleteMapping("/workout-plans/{id}")


    @PostMapping("/create-workout-plan")
    public ResponseEntity<?> createWorkoutPlan(@RequestBody WorkoutPlanForm workoutPlanForm ) {
        workoutPlanService.createNewWorkoutPlan(workoutPlanForm);
        return ResponseEntity.status(HttpStatus.OK).body("Workout plan successfully created.");
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
    public ResponseEntity<?> specificWorkout(@PathVariable Long id){
        WorkoutPlanResponse workoutPlan = workoutPlanService.getWorkoutPlanById(id);
        return ResponseEntity.status(HttpStatus.OK).body(workoutPlan);
    }

    @PostMapping("/create-workout-session")
    public ResponseEntity<?> createWorkoutSession(@RequestHeader("Authorization") String token,
                                                  @RequestBody WorkoutSessionForm workoutSessionForm) {
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        workoutSessionService.createWorkoutSession(workoutSessionForm, user);
        return ResponseEntity.status(HttpStatus.OK).body("Workout session successfully created..");
    }

    @GetMapping("workout-session")
    public ResponseEntity<?> getWorkoutSession(@RequestHeader("Authorization") String token,
                                               @RequestParam("startDate") String startDate,
                                               @RequestParam("endDate") String endDate) throws Exception {
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy.");
        Date start = dateFormat.parse(startDate);
        Date end = dateFormat.parse(endDate);
        
        Set<WorkoutSessionResponse> wsr = workoutSessionService.getWorkoutSessionsBetweenDates(user, start, end);
        return ResponseEntity.status(HttpStatus.OK).body(wsr);
    }

    @GetMapping("workout-sessions-user")
    public ResponseEntity<?> getUserWorkoutSessions(@RequestHeader("Authorization") String token){
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Set<WorkoutSessionResponse> response = workoutSessionService.getWorkoutSessionsForUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }



    // TODO: This should be endpoint for getting all exercises for admin
    @GetMapping("all-exercises")
    public ResponseEntity<?> getAllExercises(){
        List<ExerciseResponse> exercises = workoutPlanService.listAllExercises();
        return ResponseEntity.status(HttpStatus.OK).body(exercises);
    }

    // TODO: Make the endpoint for getting exercise by id
    // @GetMapping("exercise/{id}")


    @GetMapping("all-exercises/created-by-user")
    public ResponseEntity<?> getAllExercisesCreatedByUser(@RequestHeader("Authorization") String token){
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        List<ExerciseResponse> exercises = workoutPlanService.listAllExercisesCreatedByUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(exercises);
    }

    // TODO: Make endpoint for getting all public exercises

    @PostMapping("create-exercise")
    public ResponseEntity<?> createExercise(@RequestHeader("Authorization") String token,
                                            @RequestBody ExerciseForm exerciseForm){

        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        workoutPlanService.createExercise(user, exerciseForm);
        return ResponseEntity.status(HttpStatus.OK).body("Exercise successfully created.");
    }

    @PostMapping("create-muscle-group")
    public ResponseEntity<?> createMuscleGroup(@RequestBody MuscleGroupDTO muscleGroupDTO) {
        workoutPlanService.createMuscleGroup(muscleGroupDTO);
        return ResponseEntity.status(HttpStatus.OK).body("Muscle Group successfully created.");
    }

    @GetMapping("all-muscle-groups")
    public ResponseEntity<?> getAllMuscleGroups(){
        Set<MuscleGroupDTO> muscleGroups = workoutPlanService.listAllMuscleGroups();
        return ResponseEntity.status(HttpStatus.OK).body(muscleGroups);
    }

    @PostMapping("upload-file")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file){
        String fileName = workoutPlanService.uploadFile(file);
        return ResponseEntity.status(HttpStatus.OK).body(fileName);
    }
}
