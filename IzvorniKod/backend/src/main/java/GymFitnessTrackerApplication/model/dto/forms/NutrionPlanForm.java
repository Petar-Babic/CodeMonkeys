package GymFitnessTrackerApplication.model.dto.forms;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class NutrionPlanForm {

    private float calories;

    private float protein;

    private float carbs;

    private float fat;

    private String startDate;

    private String endDate;

    private Long userId;

    public float getCalories() {
        return calories;
    }

    public void setCalories(float calories) {
        this.calories = calories;
    }

    public float getProtein() {
        return protein;
    }

    public void setProtein(float protein) {
        this.protein = protein;
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

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate=endDate;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long createdFor) {
        this.userId = createdFor;
    }
    public NutrionPlanForm() {
    }

    public NutrionPlanForm(float calories, float protein, float carbs, float fat, String startDate, String endDate) {
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.endDate=endDate;
        this.startDate=startDate;
    }

    public NutrionPlanForm(float calories, float protein, float carbs, float fat, String startDate, String endDate, Long userId) {
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
    }
}
