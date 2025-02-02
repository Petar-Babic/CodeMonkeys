package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutSessionForm;
import GymFitnessTrackerApplication.model.dto.response.WorkoutSessionResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.ReviewDTO;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.WorkoutSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

@Controller
@RequestMapping("/api")
public class WorkoutSessionController {

    @Autowired
    private WorkoutSessionService workoutSessionService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private MyUserService myUserService;

    @PostMapping("/create-workout-session")
    public ResponseEntity<?> createWorkoutSession(@RequestHeader("Authorization") String token,
                                                  @RequestBody WorkoutSessionForm workoutSessionForm) {
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        WorkoutSessionResponse wsr = workoutSessionService.createWorkoutSession(workoutSessionForm, user);
        return ResponseEntity.status(HttpStatus.OK).body(wsr);
    }

    @PutMapping("/workout-session/{id}")
    public ResponseEntity<?> updateWorkoutSession(@RequestHeader("Authorization") String token,@PathVariable Long id,
                                                  @RequestBody WorkoutSessionResponse workoutSessionResponse){
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        WorkoutSessionResponse wsr = workoutSessionService.updateWorkoutSession(id, workoutSessionResponse, user);
        return ResponseEntity.status(HttpStatus.OK).body(wsr);
    }

    @DeleteMapping("/workout-session/{id}")
    public ResponseEntity<?> deleteWorkoutSession(@RequestHeader("Authorization") String token, @PathVariable Long id){
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        workoutSessionService.deleteWorkoutSession(id, user);
        return ResponseEntity.status(HttpStatus.OK).body("Workout session successfully deleted.");
    }

    @GetMapping("/workout-sessions/{id}")
    public ResponseEntity<?> getWorkoutSession(@PathVariable Long id){
        WorkoutSessionResponse wsr = workoutSessionService.getWorkoutSession(id);
        return ResponseEntity.status(HttpStatus.OK).body(wsr);
    }

    @GetMapping("/workout-sessions")
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

    //mozda bolje /user/workout-sessions
    @GetMapping("/workout-sessions-user")
    public ResponseEntity<?> getUserWorkoutSessions(@RequestHeader("Authorization") String token){
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Set<WorkoutSessionResponse> response = workoutSessionService.getWorkoutSessionsForUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/trainer/workout-session/{id}")
    public ResponseEntity<?> createTrainerReviewForWorkoutSession(@RequestHeader("Authorization") String token,
                                                                  @PathVariable Long id, @RequestBody ReviewDTO review){
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        ReviewDTO reviewDTO = workoutSessionService.createTrainerReview(id, review, user);

        return ResponseEntity.status(HttpStatus.OK).body(reviewDTO);
    }
}
