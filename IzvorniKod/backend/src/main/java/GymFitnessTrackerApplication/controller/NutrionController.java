package GymFitnessTrackerApplication.controller;


import GymFitnessTrackerApplication.exception.NoNutrionPlanException;
import GymFitnessTrackerApplication.model.dao.MyNutrionPlanRepo;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.dto.forms.NutrionPlanForm;
import GymFitnessTrackerApplication.model.dto.response.BodyMeasurementsResponse;
import GymFitnessTrackerApplication.model.dto.response.NutrionPlanResponse;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.NutrionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchTransactionManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/nutrition-plan")
public class NutrionController {


    @Autowired
    private JwtService jwtService;

    @Autowired
    private MyUserService myUserService;

    @Autowired
    private NutrionService myNutrionService;

    @PostMapping("")
    public ResponseEntity<?> postNutrionPlan(@RequestBody NutrionPlanForm form, @RequestHeader("Authorization") String auth){
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        NutrionPlan plan = myNutrionService.createNutrionPlan(user,form);

        return ResponseEntity.status(200).body(new NutrionPlanResponse(plan));
    }

    @PutMapping("")
    public ResponseEntity<?> updateCurrentNutrionPlan(@RequestBody NutrionPlanForm form, @RequestHeader("Authorization") String auth){
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        NutrionPlan plan = myNutrionService.getMyPlan(user);

        if(plan == null){
            //plan = myNutrionService.createNutrionPlan(user,form);
            throw new NoNutrionPlanException("NO existing plan to update");
        }else{
            myNutrionService.updateNutrionPlan(form,plan);
        }

        //myUserService.updateCurrentNutrion(user,plan);

        return ResponseEntity.status(200).body(new NutrionPlanResponse(plan));
    }


    @PutMapping("{id}")
    public ResponseEntity<?> updateNutrionPlan(@RequestBody NutrionPlanForm form, @RequestHeader("Authorization") String auth,@PathVariable String id){
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        NutrionPlan plan = myNutrionService.getPlanFromId(id);

        if(plan == null){
            //plan = myNutrionService.createNutrionPlan(user,form);
            throw new NoNutrionPlanException("NO existing plan to update");
        }else{
            myNutrionService.updateNutrionPlan(form,plan);
        }

        //myUserService.updateCurrentNutrion(user,plan);

        return ResponseEntity.status(200).body(new NutrionPlanResponse(plan));
    }

    @GetMapping("")
    public ResponseEntity<?> getNutrionPlan(@RequestHeader("Authorization") String auth){
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        NutrionPlan plan = myNutrionService.getMyPlan(user);
        return ResponseEntity.status(200).body(new NutrionPlanResponse(plan));
    }
}