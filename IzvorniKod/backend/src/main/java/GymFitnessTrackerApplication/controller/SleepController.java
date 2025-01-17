package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.SleepLog;
import GymFitnessTrackerApplication.model.dto.forms.SleepLogForm;
import GymFitnessTrackerApplication.model.dto.response.SleepLogResponse;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.SleepService;
import org.apache.juli.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sleep-log")
public class SleepController {

    @Autowired
    private MyUserService myUserService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private SleepService sleepService;


    @PostMapping("")
    public ResponseEntity<?> createSleepLog(@RequestBody SleepLogForm form,@RequestHeader("Authorization") String auth){
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        SleepLog sleepLog = sleepService.createFromForm(form,user);
        return  ResponseEntity.status(200).body(new SleepLogResponse(sleepLog));
    }

    @GetMapping("")
    public ResponseEntity<?> getSleepLogs(@RequestHeader("Authorization") String auth){
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        List<SleepLog> sleepLogs=  sleepService.getUserLogs(user);
        List<SleepLogResponse> odg = new ArrayList<>();
        sleepLogs.forEach(sleepLog -> odg.add(new SleepLogResponse(sleepLog)));
        return ResponseEntity.status(200).body(odg);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getSleepLog(@RequestHeader("Authorization") String auth,@PathVariable String id){
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Optional<SleepLog> optLog = sleepService.getSpecificLog(user,id);
        return ResponseEntity.status(200).body(new SleepLogResponse(optLog.get()));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteSleepLog(@RequestHeader("Authorization") String auth,@PathVariable String id){
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        sleepService.deleteLog(user,id);
        return ResponseEntity.status(200).body("DELETED SLEEP LOG : "+id);
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateSleepLog(@RequestHeader("Authorization") String auth,@PathVariable String id,@RequestBody SleepLogForm form){
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        SleepLog log = sleepService.updateLog(form,user,id);
        return ResponseEntity.status(200).body(new SleepLogResponse(log));
    }
}
