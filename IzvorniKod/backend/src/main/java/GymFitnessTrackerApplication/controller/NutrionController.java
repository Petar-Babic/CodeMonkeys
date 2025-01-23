package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.exception.NoNutrionPlanException;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.domain.Role;
import GymFitnessTrackerApplication.model.dto.forms.NutrionPlanForm;
import GymFitnessTrackerApplication.model.dto.response.NutrionPlanResponse;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.NutrionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

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
    public ResponseEntity<?> postNutrionPlan(@RequestBody NutrionPlanForm form, @RequestHeader("Authorization") String auth) {
            String email = jwtService.extractEmail(auth.trim().substring(7));
            MyUser user = (MyUser) myUserService.getMyUser(email);
            NutrionPlan plan;
            if(user.getRole().equals(Role.TRAINER)) plan = myNutrionService.createNutrionPlanTrainer(user,form,form.getUserId());
            else  plan= myNutrionService.createNutrionPlan(user,form);
            return ResponseEntity.status(200).body(new NutrionPlanResponse(plan));
    }

    @GetMapping("")
    public ResponseEntity<?> getNutrionPlan(@RequestHeader("Authorization") String auth) {
        System.out.println("Received GET request to /api/nutrition-plan");
        System.out.println("Authorization header: " + auth);
        
        try {
            String email = jwtService.extractEmail(auth.trim().substring(7));
            System.out.println("Extracted email: " + email);
            
            MyUser user = (MyUser) myUserService.getMyUser(email);
            System.out.println("Found user: " + user.getEmail());
            
            NutrionPlan plan = myNutrionService.getMyPlan(user);
            System.out.println("Retrieved nutrition plan: " + (plan != null ? plan.toString() : "null"));
            
            return ResponseEntity.status(200).body(new NutrionPlanResponse(plan));
        } catch (Exception e) {
            System.out.println("Error in getNutrionPlan: " + e.getMessage());
            throw e;
        }
    }

    @PutMapping("")
    public ResponseEntity<?> updateCurrentNutrionPlan(@RequestBody NutrionPlanForm form, @RequestHeader("Authorization") String auth) {
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        NutrionPlan plan = myNutrionService.getMyPlan(user);

        if(plan == null) {
            throw new NoNutrionPlanException("NO existing plan to update");
        } else {
            myNutrionService.updateNutrionPlan(form,plan);
        }

        return ResponseEntity.status(200).body(new NutrionPlanResponse(plan));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateNutrionPlan(@RequestBody NutrionPlanForm form, @RequestHeader("Authorization") String auth, @PathVariable String id) {
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        NutrionPlan plan = myNutrionService.getPlanFromId(id);

        if(plan == null) {
            throw new NoNutrionPlanException("NO existing plan to update");
        } else {
            myNutrionService.updateNutrionPlan(form,plan);
        }   

        return ResponseEntity.status(200).body(new NutrionPlanResponse(plan));
    }
}