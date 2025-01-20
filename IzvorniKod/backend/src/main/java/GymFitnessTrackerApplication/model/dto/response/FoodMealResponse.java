package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.Food;

public class FoodMealResponse {

    private float quantity;

    private FoodResponse food;

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public FoodResponse getFood() {
        return food;
    }

    public void setFood(FoodResponse food) {
        this.food = food;
    }

    public FoodMealResponse(){}

    public FoodMealResponse(float quantity, Food food){
        this.quantity = quantity;
        this.food = new FoodResponse(food);
    }
}
