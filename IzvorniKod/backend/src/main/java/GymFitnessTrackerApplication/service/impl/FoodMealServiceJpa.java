package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.model.dao.FoodMealRepo;
import GymFitnessTrackerApplication.model.dao.FoodRepo;
import GymFitnessTrackerApplication.model.dao.MealRepo;
import GymFitnessTrackerApplication.model.domain.Food;
import GymFitnessTrackerApplication.model.domain.FoodMeal;
import GymFitnessTrackerApplication.model.domain.Meal;
import GymFitnessTrackerApplication.model.dto.forms.MealForm;
import GymFitnessTrackerApplication.service.FoodMealService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FoodMealServiceJpa implements FoodMealService{

    @Autowired
    private FoodRepo foodRepo;

    @Autowired
    private FoodMealRepo foodMealRepo;

    @Autowired
    private MealRepo mealRepo;

    @Transactional
    @Override
    public List<FoodMeal> createFoodMeals(Meal meal, MealForm form){
        List<FoodMeal> foodMeals = new ArrayList<>();
        form.getMealFoods().forEach(foodMealForm -> {
            Optional<Food> food = foodRepo.findById(Long.parseLong(foodMealForm.getFoodId()));
            FoodMeal partOfMeal = new FoodMeal(foodMealForm.getQuantity(),meal,food.get());
            foodMealRepo.save(partOfMeal);
            foodMeals.add(partOfMeal);
        });
        return foodMeals;
    }


}
