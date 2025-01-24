package GymFitnessTrackerApplication.model.domain;

import GymFitnessTrackerApplication.model.dto.forms.FoodForm;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Food {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    Long id;
    Unit unit;

    String name;
    float defaultNumber;

    float calories;

    float carbs;

    float fat;

    float protein;

    boolean isApproved;

    public  Food(){}

    public Food(FoodForm form){
        this.calories= form.getCalories();
        this.fat=form.getFats();
        this.carbs = form.getCarbs();
        this.unit=form.getUnit();
        this.defaultNumber=form.getDefaultNumber();
        this.protein = form.getProtein();
        this.name = form.getName();
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

    public float getCalories() {
        return calories;
    }

    public void setCalories(float calories) {
        this.calories = calories;
    }

    public float getCarbs() {
        return carbs;
    }

    public void setCarbs(float carbs) {
        this.carbs = carbs;
    }

    public float getFat() {
        return fat;
    }

    public void setFat(float fat) {
        this.fat = fat;
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

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}