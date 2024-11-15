package GymFitnessTrackerApplication.domain;


import GymFitnessTrackerApplication.forms.BodyGoalsForm;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.ZonedDateTime;

@Entity
@Table(name = "StatsAndGoals")
public class StatsGoals {


    @Id
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private MyUser userId;

    Float height;

    Float weight;

    ActivityLevel activityLevel;

    Gender gender;

    Integer timelineWeeks;

    Integer protein;

    Integer carbs;

    Integer fat;

    Float calories;

    ZonedDateTime createdAt;

    ZonedDateTime updatedAt;

    public MyUser getUserId() {
        return userId;
    }

    public void setUserId(MyUser userId) {
        this.userId = userId;
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

    public void setActivityLevel(ActivityLevel activityLevel) {
        this.activityLevel = activityLevel;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
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

    public StatsGoals(){

    }

    public StatsGoals(MyUser user, @RequestBody BodyGoalsForm bg,ZonedDateTime time){
        this.userId=user;
        this.activityLevel = ActivityLevel.valueOf(bg.getActivityLevel());
        this.calories=bg.getCalories();
        this.carbs=bg.getCarbs();
        this.fat = bg.getFat();
        this.protein=bg.getProtein();
        this.gender=Gender.valueOf(bg.getGender());
        this.height=bg.getHeight();
        this.timelineWeeks=bg.getTimelineWeeks();
        this.weight=bg.getWeight();
        this.createdAt=time;
        this.updatedAt=time;
    }
}
