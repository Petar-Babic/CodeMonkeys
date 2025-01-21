package GymFitnessTrackerApplication.controller;


import GymFitnessTrackerApplication.model.domain.Food;
import GymFitnessTrackerApplication.model.domain.FoodMeal;
import GymFitnessTrackerApplication.model.domain.Meal;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.DatesForm;
import GymFitnessTrackerApplication.model.dto.forms.FoodForm;
import GymFitnessTrackerApplication.model.dto.forms.FoodMealForm;
import GymFitnessTrackerApplication.model.dto.forms.MealForm;
import GymFitnessTrackerApplication.model.dto.response.FoodResponse;
import GymFitnessTrackerApplication.model.dto.response.MealResponse;
import GymFitnessTrackerApplication.service.*;
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

    @Autowired
    private MealService mealService;

    @Autowired
    private FoodMealService foodMealService;

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
        Food food = foodService.updateFood(id,form);
        return ResponseEntity.status(200).body(new FoodResponse(food));

    }

    @PostMapping("/api/meal")
    public ResponseEntity<?> createMeal(@RequestBody MealForm form,@RequestHeader("Authorization") String auth){
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Meal meal = mealService.createMealUser(user,form);
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

    @GetMapping("/api/meal/between-dates")
    public ResponseEntity<?> mealsBetweenDates(@RequestBody DatesForm form,@RequestHeader("Authorization") String auth){
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        List<Meal> meals = mealService.getMealsBetweenDates(user,form.startTime(),form.endTime());
        List<MealResponse> res = new ArrayList<>();
        meals.forEach(
                meal ->  res.add(new MealResponse(meal))
        );
        return ResponseEntity.status(200).body(res);
    }
}
