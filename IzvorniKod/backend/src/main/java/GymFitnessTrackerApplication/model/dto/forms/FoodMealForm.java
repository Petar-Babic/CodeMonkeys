package GymFitnessTrackerApplication.model.dto.forms;

import GymFitnessTrackerApplication.model.domain.FoodMeal;

public class FoodMealForm {

    private float quantity;

    private String foodId;

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public String getFoodId() {
        return foodId;
    }

    public void setFoodId(String foodId) {
        this.foodId = foodId;
    }

    public FoodMealForm(){

    }

    public FoodMealForm(int quantity,String foodId){
        this.foodId = foodId;
        this.quantity = quantity;
    }
}
