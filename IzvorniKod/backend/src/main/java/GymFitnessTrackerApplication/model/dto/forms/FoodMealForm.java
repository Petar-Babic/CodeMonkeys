package GymFitnessTrackerApplication.model.dto.forms;

import GymFitnessTrackerApplication.model.domain.FoodMeal;

public class FoodMealForm {

    private int quantity;

    private String foodId;

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
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
