package GymFitnessTrackerApplication.controller;


import GymFitnessTrackerApplication.model.dao.MyNutrionPlanRepo;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.forms.NutrionPlanForm;
import GymFitnessTrackerApplication.model.response.NutrionPlanResponse;
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

    @Autowired
    private MyNutrionPlanRepo nutrionPlanRepo;
  /*  @PostMapping("")
    public String stvoriPlan() {
        return "Stvoren nutrion plan";
    }*/

    @PostMapping("")
    public ResponseEntity<?> postNutrionPlan(@RequestBody NutrionPlanForm form, @RequestHeader("Authorization") String auth){
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        NutrionPlan plan = myNutrionService.createNutrionPlan(user,form);

        return ResponseEntity.status(200).body(new NutrionPlanResponse(plan.getId().toString(),user.getId().toString(),plan.getCalories(),plan.getProtein(),plan.getCarbs(),plan.getFat(),plan.getStartDate(),plan.getEndDate(),plan.getCreatedAt(),plan.getUpdatedAt()));
        //(String id, String userId, float calories, float protein, float carbs, float fat, LocalDate startDate, java.time.LocalDate
        //endDate, ZonedDateTime createdAt, ZonedDateTime updatedAt)
    }

    @PutMapping("")
    public ResponseEntity<?> updateNutrionPlan(@RequestBody NutrionPlanForm form, @RequestHeader("Authorization") String auth){
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Optional<NutrionPlan> nutrionPlan = nutrionPlanRepo.findByMyUser(user);
        NutrionPlan plan;

        if(nutrionPlan.isEmpty()){
            plan = myNutrionService.createNutrionPlan(user,form);
        }else{
            myNutrionService.updateNutrionPlan(user,form);
            plan = nutrionPlanRepo.findByMyUser(user).get();
        }

        return ResponseEntity.status(200).body(new NutrionPlanResponse(plan.getId().toString(),user.getId().toString(),plan.getCalories(),plan.getProtein(),plan.getCarbs(),plan.getFat(),plan.getStartDate(),plan.getEndDate(),plan.getCreatedAt(),plan.getUpdatedAt()));
        //(String id, String userId, float calories, float protein, float carbs, float fat, LocalDate startDate, java.time.LocalDate
        //endDate, ZonedDateTime createdAt, ZonedDateTime updatedAt)
    }

    @GetMapping("")
    public ResponseEntity<?> getNutrionPlan(@RequestHeader("Authorization") String auth){
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Optional<NutrionPlan> nutrionPlan = nutrionPlanRepo.findByMyUser(user);
        if(nutrionPlan.isEmpty())
            return ResponseEntity.status(404).body("No nutrition plan found");
        NutrionPlan plan = nutrionPlan.get();
        return ResponseEntity.status(200).body(new NutrionPlanResponse(plan.getId().toString(),user.getId().toString(),plan.getCalories(),plan.getProtein(),plan.getCarbs(),plan.getFat(),plan.getStartDate(),plan.getEndDate(),plan.getCreatedAt(),plan.getUpdatedAt()));
    }
}
