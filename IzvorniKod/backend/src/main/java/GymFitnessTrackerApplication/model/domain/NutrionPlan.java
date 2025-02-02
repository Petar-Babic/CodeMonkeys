package GymFitnessTrackerApplication.model.domain;

import GymFitnessTrackerApplication.model.dto.forms.BodyGoalsForm;
import GymFitnessTrackerApplication.model.dto.forms.NutrionPlanForm;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Entity
public class NutrionPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private MyUser myUser;

    private float calories;

    private float protein;

    private float carbs;

    private float fat;

    private LocalDate startDate;

    private LocalDate endDate;

    private ZonedDateTime createdAt;

    // nezz jel
    private ZonedDateTime updatedAt;

    private String createdBy;

    private boolean isCurrent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MyUser getMyUser() {
        return myUser;
    }

    public void setMyUser(MyUser myUser) {
        this.myUser = myUser;
    }

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

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }


    public boolean isCurrent() {
        return isCurrent;
    }

    public void setCurrent(boolean current) {
        isCurrent = current;
    }

    public NutrionPlan(){

    }
    public NutrionPlan(MyUser user, @RequestBody NutrionPlanForm form){
        this.myUser = user;
        this.calories = form.getCalories();
        this.fat = form.getFat();
        this.carbs = form.getCarbs();
        this.protein = form.getProtein();
        
        // Parse ISO format date and extract only the date part
        this.startDate = LocalDate.parse(form.getStartDate().substring(0, 10));
        this.endDate = LocalDate.parse(form.getEndDate().substring(0, 10));
        
        this.createdAt = ZonedDateTime.now();
        this.updatedAt = ZonedDateTime.now();
    }

    public NutrionPlan(MyUser user, @RequestBody BodyGoalsForm form){
        this.myUser = user;
        this.calories = form.getCalories();
        this.fat = form.getFat();
        this.carbs = form.getCarbs();
        this.protein = form.getProtein();

        // Parse ISO format date and extract only the date part
        this.startDate = form.getStartDate();
        this.endDate = form.getEndDate();

        this.createdAt = ZonedDateTime.now();
        this.updatedAt = ZonedDateTime.now();
    }

}
