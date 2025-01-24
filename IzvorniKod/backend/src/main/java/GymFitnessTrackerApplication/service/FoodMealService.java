package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.FoodMeal;
import GymFitnessTrackerApplication.model.domain.Meal;
import GymFitnessTrackerApplication.model.dto.forms.MealForm;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FoodMealService {

    List<FoodMeal> createFoodMeals(Meal meal, MealForm form);

    List<FoodMeal> updateFoodMeals(Meal meal, MealForm form);


}
