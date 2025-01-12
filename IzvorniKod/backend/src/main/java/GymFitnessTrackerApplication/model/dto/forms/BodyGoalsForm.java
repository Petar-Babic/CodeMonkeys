package GymFitnessTrackerApplication.model.dto.forms;

import java.time.ZonedDateTime;

public class BodyGoalsForm {

    private float height;
    private float weight;

    private float goalWeight;

    private String activityLevel;

    private String gender;

    private int timelineWeeks;

    private int protein;

    private int carbs;

    private int fat;

    private float calories;


    public BodyGoalsForm(float height,float weight,float goalWeight,String activityLevel,String gender,int timelineWeeks,int protein,int carbs,int fat,int calories,ZonedDateTime time){
        this.height=height;
        this.weight=weight;
        this.goalWeight=goalWeight;
        this.activityLevel=activityLevel;
        this.gender=gender;
        this.protein=protein;
        this.carbs=carbs;
        this.fat=fat;
        this.calories=calories;
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

    public float getGoalWeight() {
        return goalWeight;
    }

    public void setGoalWeight(float goalWeight) {
        this.goalWeight = goalWeight;
    }

    public String getActivityLevel() {
        return activityLevel;
    }

    public void setActivityLevel(String activityLevel) {
        this.activityLevel = activityLevel;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getTimelineWeeks() {
        return timelineWeeks;
    }

    public void setTimelineWeeks(int timelineWeeks) {
        this.timelineWeeks = timelineWeeks;
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
}
