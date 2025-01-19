package GymFitnessTrackerApplication.model.dto.forms;

import GymFitnessTrackerApplication.model.domain.Unit;

public class FoodForm {
    private String name;

    private float calories;

    private Unit unit;

    private int defaultNumber;

    private float fats,carbs,protein;

    private boolean isApproved;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getCalories() {
        return calories;
    }

    public void setCalories(float calories) {
        this.calories = calories;
    }

    public int getDefaultNumber() {
        return defaultNumber;
    }

    public void setDefaultNumber(int defaultNumber) {
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

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = Unit.valueOf(unit);
    }

    public FoodForm(){

    }

    public FoodForm(String name, float calories, String unit,int defaultNumber,float fats,float carbs,float protein,boolean isApproved){
        this.name = name;
        this.calories = calories;
        this.setUnit(unit);
        this.defaultNumber = defaultNumber;
        this.fats = fats;
        this.carbs = carbs;
        this.protein = protein;
        this.isApproved = isApproved;
    }
}
