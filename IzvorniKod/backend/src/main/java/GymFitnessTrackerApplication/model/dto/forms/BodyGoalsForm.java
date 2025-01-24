package GymFitnessTrackerApplication.model.dto.forms;

import GymFitnessTrackerApplication.model.domain.ActivityLevel;
import GymFitnessTrackerApplication.model.domain.Gender;

import java.time.LocalDate;
import java.time.ZonedDateTime;

public class BodyGoalsForm {

    private ActivityLevel activityLevel;

    private Gender gender;

    private float height;
    private float weight;

    private int protein;

    private int carbs;

    private int fat;

    private float calories;

    private LocalDate startDate;

    private LocalDate endDate;


    public BodyGoalsForm(ActivityLevel activityLevel,Gender gender,float height,float weight,int protein,int carbs,int fat,int calories,LocalDate startDate,LocalDate endDate ){
        this.activityLevel = activityLevel;
        this.gender = gender;
        this.height=height;
        this.weight=weight;
        this.protein=protein;
        this.carbs=carbs;
        this.fat=fat;
        this.calories=calories;
        this.endDate=endDate;
        this.startDate = startDate;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public int getProtein() {
        return protein;
    }

    public void setProtein(int protein) {
        this.protein = protein;
    }

    public int getCarbs() {
        return carbs;
    }

    public void setCarbs(int carbs) {
        this.carbs = carbs;
    }

    public int getFat() {
        return fat;
    }

    public void setFat(int fat) {
        this.fat = fat;
    }

    public float getCalories() {
        return calories;
    }

    public void setCalories(float calories) {
        this.calories = calories;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public ActivityLevel getActivityLevel() {
        return activityLevel;
    }

    public void setActivityLevel(ActivityLevel activityLevel) {
        this.activityLevel = activityLevel;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }
}
