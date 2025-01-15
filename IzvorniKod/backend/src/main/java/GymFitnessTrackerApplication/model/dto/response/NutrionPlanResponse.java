package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.NutrionPlan;

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


    public NutrionPlanResponse(NutrionPlan np){
        this.id = np.getId().toString();
        this.fat=np.getFat();
        this.carbs=np.getCarbs();
        this.calories = np.getCalories();
        this.createdAt = np.getCreatedAt();
        this.updatedAt = np.getUpdatedAt();
        this.protein = np.getProtein();
        this.startDate = np.getStartDate();
        this.endDate = np.getEndDate();
        this.userId=np.getMyUser().getId().toString();
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
