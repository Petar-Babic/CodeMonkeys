package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.exception.AdminRestrictedException;
import GymFitnessTrackerApplication.exception.NoExistingFoodException;
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
            plan= myNutrionService.createNutrionPlan(user,form);
            return ResponseEntity.status(200).body(new NutrionPlanResponse(plan));
    }

    @GetMapping("")
    public ResponseEntity<?> getNutrionPlan(@RequestHeader("Authorization") String auth) {
            String email = jwtService.extractEmail(auth.trim().substring(7));
            MyUser user = (MyUser) myUserService.getMyUser(email);
            NutrionPlan plan;
            plan = myNutrionService.getMyPlan(user);
            
            return ResponseEntity.status(200).body(new NutrionPlanResponse(plan));
    }

    @PutMapping("")
    public ResponseEntity<?> updateCurrentNutrionPlan(@RequestBody NutrionPlanForm form, @RequestHeader("Authorization") String auth) {
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        NutrionPlan plan;
        plan = myNutrionService.getMyPlan(user);

        myNutrionService.updateNutrionPlan(form,plan);

        return ResponseEntity.status(200).body(new NutrionPlanResponse(plan));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateNutrionPlan(@RequestBody NutrionPlanForm form, @RequestHeader("Authorization") String auth, @PathVariable String id) {
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        NutrionPlan plan = myNutrionService.getPlanFromId(id);

        if(plan.getMyUser().getId() != user.getId() && jwtService.extractTrainerMail(auth.trim().substring(7)) == null)
            throw new AdminRestrictedException("USER nije trener");


        // if (!plan.getCreatedBy().equals(user.getId())) {
        //     if (user.getRole().equals(Role.TRAINER)
        //         // ako treba i za admina user.getRole().equals(Role.TRAINER)
        //     ) {
        //         String idUser = jwtService.extractUserId(auth.trim().substring(7));
        //         if (myUserService.getMyUserByID(idUser).getRole().equals(Role.USER) && myUserService.getMyUserByID(idUser).getTrainer().getId().equals(user.getId()))
        //             myNutrionService.updateNutrionPlan(form, plan);
        //         else throw new AdminRestrictedException("USER ISNT TRAINED BY THIS");
        //     } else throw new AdminRestrictedException("USER nije trener");
        // } else myNutrionService.updateNutrionPlan(form, plan);

        myNutrionService.updateNutrionPlan(form, plan);

        NutrionPlanResponse response = new NutrionPlanResponse(plan);

        return ResponseEntity.status(200).body(response);
    }
}