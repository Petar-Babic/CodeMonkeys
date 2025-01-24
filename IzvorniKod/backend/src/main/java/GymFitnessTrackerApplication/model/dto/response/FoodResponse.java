package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.Food;
import GymFitnessTrackerApplication.model.domain.Unit;

public class FoodResponse {

    private String id;

    private String name;

    private float calories;

    private Unit unit;

    private float defaultNumber;

    private float fats;

    private float carbs;

    private float protein;

    private boolean isApproved;

    public FoodResponse() {
    }

    public FoodResponse(Food f){
        this.id = f.getId().toString();
        this.name = f.getName();
        this.calories = f.getCalories();
        this.carbs = f.getCarbs();
        this.unit = f.getUnit();
        this.protein = f.getProtein();
        this.defaultNumber = f.getDefaultNumber();
        this.fats = f.getFat();
        this.isApproved = f.isApproved();

    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public float getCalories() {
        return calories;
    }

    public void setCalories(float calories) {
        this.calories = calories;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public float getDefaultNumber() {
        return defaultNumber;
    }

    public void setDefaultNumber(float defaultNumber) {
        this.defaultNumber = defaultNumber;
    }

    public float getFats() {
        return fats;
    }

    public void setFats(float fats) {
        this.fats = fats;
    }

    public float getCarbs() {
        return carbs;
    }

    public void setCarbs(float carbs) {
        this.carbs = carbs;
    }

    public float getProtein() {
        return protein;
    }

    public void setProtein(float protein) {
        this.protein = protein;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }
}
