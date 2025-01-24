package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.FoodMeal;
import GymFitnessTrackerApplication.model.domain.Meal;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.MealForm;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface MealService {

    Meal createMeal(MyUser user, MealForm form);

    void setFoodMeals(Meal meal, List<FoodMeal> foodMeals);

    Meal createMealUser(MyUser user,MealForm form);

    Meal createMealTrainer(MyUser user, MealForm form);

    Meal getMeal(MyUser u,String id);

    List<Meal> getMeals(MyUser u);

    List<Meal> getAllMeals(MyUser u);

    void deleteMeal(String id);

    Meal updateMeal(String id,MealForm form,MyUser user);

    List<Meal> getMealsBetweenDates(MyUser user, LocalDate startDate, LocalDate endDate);
}
