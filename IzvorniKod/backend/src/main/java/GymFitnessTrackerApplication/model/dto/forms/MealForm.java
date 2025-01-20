package GymFitnessTrackerApplication.model.dto.forms;

import GymFitnessTrackerApplication.model.domain.FoodMeal;
import GymFitnessTrackerApplication.model.domain.Meal;

import java.time.ZonedDateTime;
import java.util.List;

public class MealForm {

    private ZonedDateTime time;
    private List<FoodMealForm> mealFoods;

    private String name;

    private String userId;

    public ZonedDateTime getTime() {
        return time;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public List<FoodMealForm> getMealFoods() {
        return mealFoods;
    }

    public void setMealFoods(List<FoodMealForm> mealFoods) {
        this.mealFoods = mealFoods;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public MealForm(){}

    public MealForm(ZonedDateTime time,String name,String userId,List<FoodMealForm> mealFoods){
        this.mealFoods = mealFoods;
        this.time = time;
        this.userId = userId;
        this.name=name;
    }
}
