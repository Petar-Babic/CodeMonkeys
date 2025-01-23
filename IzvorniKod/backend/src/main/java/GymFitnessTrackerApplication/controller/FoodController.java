package GymFitnessTrackerApplication.controller;


import GymFitnessTrackerApplication.model.domain.*;
import GymFitnessTrackerApplication.model.dto.forms.FoodForm;
import GymFitnessTrackerApplication.model.dto.forms.MealForm;
import GymFitnessTrackerApplication.model.dto.response.FoodResponse;
import GymFitnessTrackerApplication.model.dto.response.MealResponse;
import GymFitnessTrackerApplication.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @Autowired
    private MealService mealService;

    @Autowired
    private FoodMealService foodMealService;

    @PostMapping(value = "/api/food/scan-barcode",params = {"barcode"})
    public ResponseEntity<?> searchFood(@RequestHeader("Authorization") String token,@RequestParam String barcode){
        String email = jwtService.extractEmail(token.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        foodService.createFoodFromBarcode(user,barcode);
        return ResponseEntity.status(200).body(barcode);
    }

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

    // TODO: Add update food

    @PutMapping("/api/food/{id}")
    public ResponseEntity<?> updateFood(@RequestBody FoodForm form,@RequestHeader("Authorization") String auth,@PathVariable String id){
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Food food = foodService.updateFood(id,form,user);
        return ResponseEntity.status(200).body(new FoodResponse(food));
    }

    @PostMapping("/api/meal")
    public ResponseEntity<?> createMeal(@RequestBody MealForm form,@RequestHeader("Authorization") String auth){
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Meal meal;
        if(user.getRole().equals(Role.TRAINER))  meal= mealService.createMealTrainer(user,form);
        else meal = mealService.createMealUser(user,form);
        List<FoodMeal> foodmeals = foodMealService.createFoodMeals(meal,form);
        mealService.setFoodMeals(meal,foodmeals);
        MealResponse res = new MealResponse(meal);
        return ResponseEntity.status(200).body(res);
    }

    @GetMapping("/api/meal/{id}")
    public ResponseEntity<?> getMeal(@PathVariable String id,@RequestHeader("Authorization") String auth){
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Meal m = mealService.getMeal(user,id);
        MealResponse res = new MealResponse(m);
        return ResponseEntity.status(200).body(res);
    }

    @GetMapping("/api/meal")
    public ResponseEntity<?> getMeals(@RequestHeader("Authorization") String auth){
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        List<Meal> meals = mealService.getMeals(user);
        List<MealResponse> res = new ArrayList<>();
        meals.forEach(
                meal ->  res.add(new MealResponse(meal))
        );
        return ResponseEntity.status(200).body(res);
    }

    @GetMapping(value = "/api/meal/between-dates" , params = {"startTime","endTime"} )
    public ResponseEntity<?> mealsBetweenDates(@RequestParam LocalDate startTime,@RequestParam LocalDate endTime, @RequestHeader("Authorization") String auth){
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        List<Meal> meals = mealService.getMealsBetweenDates(user,startTime,endTime);
        List<MealResponse> res = new ArrayList<>();
        meals.forEach(
                meal ->  res.add(new MealResponse(meal))
        );
        return ResponseEntity.status(200).body(res);
    }
}
