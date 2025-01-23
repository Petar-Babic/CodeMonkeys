package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.response.TrainerDetailsResponse;
import GymFitnessTrackerApplication.service.MyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class TrainerController {

    @Autowired
    private MyUserService myUserService;

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
}
