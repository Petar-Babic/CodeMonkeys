package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.domain.Measurement;
import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.forms.BodyMeasurementForm;
import GymFitnessTrackerApplication.response.BodyMeasurementsResponse;
import GymFitnessTrackerApplication.response.ErrorResponse;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyMeasurementsService;
import GymFitnessTrackerApplication.service.MyUserDetailsService;
import GymFitnessTrackerApplication.service.MyUserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserDataController {

    @Autowired
    private  MyMeasurementsService myMeasurementsService;

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
                    .body(new ErrorResponse(0, "Unauthorized request", List.of("Invalid email sent")));
        }catch (ExpiredJwtException ex){
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(0, "Unauthorized request", List.of("JWT expired")));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(0, "Internal Server Error", List.of("An unexpected error occurred")));
        }
    }

    @PostMapping("/api/user/body-stats-and-goals")
    public String goalz(){
        return "Goalz";
    }

    @GetMapping("/info")
    public String info(){
        return "info";
    }
}
