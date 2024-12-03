package GymFitnessTrackerApplication.model.response;

import java.time.ZonedDateTime;

public class BodyGoalsResponse {
    private String userId;
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
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    public int getFat() {
        return fat;
    }

    public float getCalories() {
        return calories;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getUserId() {
        return userId;
    }

    public float getHeight() {
        return height;
    }

    public float getWeight() {
        return weight;
    }

    public float getGoalWeight() {
        return goalWeight;
    }

    public String getActivityLevel() {
        return activityLevel;
    }

    public String getGender() {
        return gender;
    }

    public int getTimelineWeeks() {
        return timelineWeeks;
    }

    public int getProtein() {
        return protein;
    }

    public int getCarbs() {
        return carbs;
    }

    public BodyGoalsResponse(String userId, float height, float weight, float goalWeight, String activityLevel, String gender, int timelineWeeks, int protein, int carbs, int fat, float calories, ZonedDateTime createdAt, ZonedDateTime updatedAt) {
        this.userId = userId;
        this.height = height;
        this.weight = weight;
        this.goalWeight = goalWeight;
        this.activityLevel = activityLevel;
        this.gender = gender;
        this.timelineWeeks = timelineWeeks;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.calories = calories;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
