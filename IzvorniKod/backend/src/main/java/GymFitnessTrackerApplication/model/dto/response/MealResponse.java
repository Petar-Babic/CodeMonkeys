package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.Meal;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

public class MealResponse {

    private boolean isSuggestion;

    private ZonedDateTime time;

    private String name;

    private String suggestedId;

    private String createdBy;

    private String userId;

    private List<FoodMealResponse> mealFoods;

    public boolean isSuggestion() {
        return isSuggestion;
    }

    public void setSuggestion(boolean suggestion) {
        isSuggestion = suggestion;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSuggestedId() {
        return suggestedId;
    }

    public void setSuggestedId(String suggestedId) {
        this.suggestedId = suggestedId;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<FoodMealResponse> getMealFoods() {
        return mealFoods;
    }

    public void setMealFoods(List<FoodMealResponse> mealFoods) {
        this.mealFoods = mealFoods;
    }

    public MealResponse(Meal m){
        this.createdBy = m.getCreatedBy();
        this.time = m.getTime();
        this.userId = m.getUser().getId().toString();
        this.name = m.getName();
        this.isSuggestion = m.isSuggestion();
        this.suggestedId = m.getSuggestedId();
        List<FoodMealResponse> foodMeals = new ArrayList<>();
        m.getMealFoods().forEach(
                mFood ->{
                    foodMeals.add(new FoodMealResponse(mFood.getQuantity(),mFood.getFood()));
                }
        );
        this.mealFoods = foodMeals;
    }
}
