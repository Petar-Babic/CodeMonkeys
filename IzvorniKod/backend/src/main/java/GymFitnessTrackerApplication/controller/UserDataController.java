package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.dao.MyStatsGoalsRepo;
import GymFitnessTrackerApplication.model.domain.Measurement;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.forms.BodyMeasurementForm;
import GymFitnessTrackerApplication.model.response.BodyMeasurementsResponse;
import GymFitnessTrackerApplication.model.response.ErrorResponse;
import GymFitnessTrackerApplication.service.*;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserDataController {

    @Autowired
    private  MyMeasurementsService myMeasurementsService;
    @Autowired
    private MyGoalsStatsService myGoalsStatsService;
    @Autowired
    private MyStatsGoalsRepo statsRepo;

    @Autowired
    private MyUserService myUserService;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/body-measurements")
    public ResponseEntity<?> setBodyMeasurements(@RequestBody BodyMeasurementForm bodyMeasForm, @RequestHeader("Authorization") String auth){
        try{
           String email= jwtService.extractEmail(auth.trim().substring(7));
            MyUser user = (MyUser) myUserService.getMyUser(email);
            Measurement m = myMeasurementsService.createMeasurement(user,bodyMeasForm);

            return ResponseEntity.status(HttpStatus.valueOf(200)).body(new BodyMeasurementsResponse(m.getMeasurementId().toString(),user.getId().toString(),bodyMeasForm.getDate(),bodyMeasForm.getChest(),bodyMeasForm.getWaist(),bodyMeasForm.getHips(),bodyMeasForm.getThighs(),bodyMeasForm.getBiceps(),bodyMeasForm.getDate(),m.getUpdated_at()));

        }catch(UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(0,"Invalid email sent"));
        }catch (ExpiredJwtException ex){
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(0,"JWT expired"));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(0, "Internal Server Error"));
        }
    }

    @PostMapping("/body-stats-and-goals")
    public String setBodyGoals(){
        return "Postavljeni body goals";
    }
    /*public ResponseEntity<?> setBodyGoals(@RequestBody BodyGoalsForm bodyGoalsForm,@RequestHeader("Authorization") String auth)
    {
        try{
            String email= jwtService.extractEmail(auth.trim().substring(7));
            MyUser user = (MyUser) myUserService.getMyUser(email);
            StatsGoals statsGoals = myGoalsStatsService.createGoals(user,bodyGoalsForm);
            statsRepo.save(statsGoals);

            return ResponseEntity.status(HttpStatus.valueOf(200)).body(new BodyGoalsResponse(user.getId().toString(),statsGoals.getHeight(),statsGoals.getWeight(),statsGoals.getGoalWeight(),statsGoals.getActivityLevel().name(), statsGoals.getGender().name(),statsGoals.getTimelineWeeks(),statsGoals.getProtein(),statsGoals.getCarbs(),statsGoals.getFat(),statsGoals.getCalories(),statsGoals.getCreatedAt(),statsGoals.getCreatedAt()));

        }catch(UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(0, "Unauthorized request", List.of("Invalid email sent")));
        }catch (ExpiredJwtException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(0, "Unauthorized request", List.of("JWT expired")));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(0, "Internal Server Error", List.of(ex.toString())));
        }
    }*/

    @GetMapping("/info")
    public String info(){
        return "info";
    }
}
