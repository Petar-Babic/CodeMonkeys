package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.FoodMeal;
import GymFitnessTrackerApplication.model.domain.Meal;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.MealForm;
import org.hibernate.boot.jaxb.internal.stax.LocalSchemaLocator;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface MealService {

    Meal createMeal(MyUser user, MealForm form);

    void setFoodMeals(Meal meal, List<FoodMeal> foodMeals);

    Meal createMealUser(MyUser user,MealForm form);

    Meal createMealAdmin(MyUser user,MealForm form);

    Meal getMeal(MyUser u,String id);

    List<Meal> getMeals(MyUser u);

    List<Meal> getAllMeals(MyUser u);

    List<Meal> getMealsBetweenDates(MyUser user, LocalDate startDate, LocalDate endDate);
}
