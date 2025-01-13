package GymFitnessTrackerApplication.model.dto.response;

import java.time.LocalDate;
import java.time.ZonedDateTime;

public class NutrionPlanResponse {

    private String id;

    private String userId;

    private float calories;

    private float protein;

    private float carbs;

    private float fat;

    private LocalDate startDate;

    private LocalDate endDate;

    private ZonedDateTime createdAt;

    // nezz jel
    private ZonedDateTime updatedAt;

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public float getCalories() {
        return calories;
    }

    public float getProtein() {
        return protein;
    }

    public float getCarbs() {
        return carbs;
    }

    public float getFat() {
        return fat;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }

    public NutrionPlanResponse(String id, String userId, float calories, float protein, float carbs, float fat, LocalDate startDate, LocalDate endDate, ZonedDateTime createdAt, ZonedDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
