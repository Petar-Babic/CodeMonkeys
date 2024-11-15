package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.forms.BodyMeasurementForm;
import GymFitnessTrackerApplication.response.BodyMeasurementsResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/user")
public class UserDataController {

    @PostMapping("/body-measurements")
    public ResponseEntity<?> setBodyMeasurements(@RequestBody BodyMeasurementForm bodyMeasForm){
        return  ResponseEntity.ok(new BodyMeasurementsResponse("lol","lol", LocalDateTime.now(),0,0,0,0,0,LocalDateTime.now(),LocalDateTime.now()));
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
