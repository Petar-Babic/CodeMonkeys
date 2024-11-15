package GymFitnessTrackerApplication.controller;


import org.springframework.boot.autoconfigure.batch.BatchTransactionManager;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;

@RestController
@RequestMapping("/api/nutrition-plan")
public class NutrionController {

    @PostMapping("")
    public String stvoriPlan() {
        return "Stvoren nutrion plan";
    }

    @PutMapping("")
    public String updatePlan(){
        return "Updatean plan";
    }

    @GetMapping("")
    public String dohvati(){
        return "Dohvacen";
    }
}
