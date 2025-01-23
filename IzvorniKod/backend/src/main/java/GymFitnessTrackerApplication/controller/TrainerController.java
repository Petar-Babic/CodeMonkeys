package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.exception.AdminRestrictedException;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.Role;
import GymFitnessTrackerApplication.model.dto.response.JwtResponse;
import GymFitnessTrackerApplication.model.dto.response.TrainerDetailsResponse;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyUserDetailsService;
import GymFitnessTrackerApplication.service.MyUserService;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class TrainerController {

    @Autowired
    private MyUserService myUserService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    //retardirano rjesenje
    @GetMapping("/api/trainers")
    public ResponseEntity<?> getAllTrainers(){

        List<MyUser> trainers = myUserService.getTrainers();
        HashMap<MyUser,Integer> trainedBy = myUserService.numberOfClients(trainers);
        List<TrainerDetailsResponse> trnrs = new ArrayList<>();
        trainers.forEach(trainer -> {
            int numberOf = trainedBy.get(trainer).intValue();
            trnrs.add(new TrainerDetailsResponse(trainer.getId(),trainer.getName(),trainer.getImage(),numberOf));
        });

        return ResponseEntity.status(200).body(trnrs);
    }

    @PostMapping("/api/trainer/pick-client/{id}")
    public ResponseEntity<?> trainUser(@RequestHeader("Authorization") String token,@PathVariable String id){
        String email= jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        if(!user.getRole().equals(Role.TRAINER)) throw new AdminRestrictedException("User not trainer");
        String  jwtToken = jwtService.generateForTraining(myUserDetailsService.loadUserByUsername(user.getEmail()),id);
        return ResponseEntity.status(200).body(new JwtResponse(token.substring(7),user.getId().toString(),user.getName(),user.getEmail()));
    }
}
