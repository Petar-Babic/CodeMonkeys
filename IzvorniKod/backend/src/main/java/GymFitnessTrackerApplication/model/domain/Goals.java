package GymFitnessTrackerApplication.model.domain;


import GymFitnessTrackerApplication.model.dto.forms.BodyGoalsForm;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.ZonedDateTime;

@Entity
@Table(name = "Goals")
public class Goals {

    @Id
    private Long id;
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private MyUser myUser;
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
    public Goals(){

    }

    public Goals(MyUser user, @RequestBody BodyGoalsForm bg){
        this.myUser=user;
        this.id=user.getId();
        this.calories=bg.getCalories();
        this.carbs=bg.getCarbs();
        this.fat = bg.getFat();
        this.protein=bg.getProtein();
        this.gender=Gender.valueOf(bg.getGender().toUpperCase());
        this.timelineWeeks=bg.getTimelineWeeks();
    }
}
