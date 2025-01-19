package GymFitnessTrackerApplication.controller;


import GymFitnessTrackerApplication.model.domain.Food;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.FoodForm;
import GymFitnessTrackerApplication.model.dto.response.FoodResponse;
import GymFitnessTrackerApplication.service.FoodService;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class FoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private MyUserService myUserService;
    @PostMapping("/api/food")
    public ResponseEntity<?> saveFood(@RequestBody FoodForm form, @RequestHeader("Authorization") String auth){
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Food food = foodService.createFoodFromForm(user,form);
        return  ResponseEntity.status(200).body(new FoodResponse(food));
    }

    @GetMapping("/api/food/{id}")
    public ResponseEntity<?> getFood(@PathVariable String id,@RequestHeader("Authorization") String auth){
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Food food = foodService.getSpecificFood(id);
        return ResponseEntity.status(200).body(new FoodResponse(food));
    }

    @GetMapping("/api/food")
    public ResponseEntity<?> getAllFood(){
        List<Food> foods = foodService.foods();
        List<FoodResponse> food = new ArrayList<>();
        foods.forEach(food1 -> {
            food.add(new FoodResponse(food1));
        });
        return ResponseEntity.status(200).body(food);
    }

    @PostMapping("/api/meal")
    public String createMeal(){
        return "creiran meal";
    }

    @GetMapping("/api/meal/{id}")
    public String getMeal(@PathVariable String id){
        return "Gotten meal "+id;
    }
}
