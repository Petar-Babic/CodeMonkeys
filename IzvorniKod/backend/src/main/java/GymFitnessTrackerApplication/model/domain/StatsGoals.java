package GymFitnessTrackerApplication.model.domain;


import GymFitnessTrackerApplication.model.forms.BodyGoalsForm;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.ZonedDateTime;

@Entity
@Table(name = "StatsAndGoals")
public class StatsGoals {


    @Id
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "Id")
    private MyUser user;

    Float height;

    Float weight;

    Float goalWeight;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    ActivityLevel activityLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    Gender gender;

    Integer timelineWeeks;

    Integer protein;

    Integer carbs;

    Integer fat;

    Float calories;

    ZonedDateTime createdAt;

    ZonedDateTime updatedAt;

    public String getUserId() {
        return userId.toString();
    }

    public void setUserId(MyUser userId) {
        this.userId = userId.getId();
    }

    public Float getHeight() {
        return height;
    }

    public void setHeight(Float height) {
        this.height = height;
    }

    public Float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public ActivityLevel getActivityLevel() {
        return activityLevel;
    }

    public void setActivityLevel(String activityLevel) {
        this.activityLevel = ActivityLevel.valueOf(activityLevel.toUpperCase());
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = Gender.valueOf(gender.toUpperCase());
    }

    public Integer getTimelineWeeks() {
        return timelineWeeks;
    }

    public void setTimelineWeeks(Integer timelineWeeks) {
        this.timelineWeeks = timelineWeeks;
    }

    public Integer getProtein() {
        return protein;
    }

    public void setProtein(Integer protein) {
        this.protein = protein;
    }

    public Integer getCarbs() {
        return carbs;
    }

    public void setCarbs(Integer carbs) {
        this.carbs = carbs;
    }

    public Integer getFat() {
        return fat;
    }

    public void setFat(Integer fat) {
        this.fat = fat;
    }

    public Float getCalories() {
        return calories;
    }

    public void setCalories(Float calories) {
        this.calories = calories;
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

    public Float getGoalWeight() {
        return goalWeight;
    }

    public void setGoalWeight(Float goalWeight) {
        this.goalWeight = goalWeight;
    }

    public StatsGoals(){

    }

    public StatsGoals(MyUser user, @RequestBody BodyGoalsForm bg){
        this.user=user;
        this.userId=user.getId();
        this.activityLevel = ActivityLevel.valueOf(bg.getActivityLevel().toUpperCase());
        this.calories=bg.getCalories();
        this.carbs=bg.getCarbs();
        this.fat = bg.getFat();
        this.protein=bg.getProtein();
        this.gender=Gender.valueOf(bg.getGender().toUpperCase());
        this.height=bg.getHeight();
        this.timelineWeeks=bg.getTimelineWeeks();
        this.weight=bg.getWeight();
        this.goalWeight=bg.getGoalWeight();
    }
}
