package GymFitnessTrackerApplication.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class MyUser{

    @Id
    @GeneratedValue
    Long id;     //originalno je String

    String password;
    String name;
    String email;
    //LocalDateTime emailVerified;
    //String image;
    Role role;
    Float height;
    Float weight;
    //Gender gender;
    //ActivityLevel activityLevel;
    //String currentNutritionPlanId;
    //String trainerId;
//    LocalDateTime createdAt;
//    LocalDateTime updatedAt;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

//    public LocalDateTime getEmailVerified() {
//        return emailVerified;
//    }
//
//    public void setEmailVerified(LocalDateTime emailVerified) {
//        this.emailVerified = emailVerified;
//    }
//
//    public String getImage() {
//        return image;
//    }
//
//    public void setImage(String image) {
//        this.image = image;
//    }

    public Role getRole() {
        return role != null ? role : Role.USER; // Default to USER if role is null
    }

    public void setRole(Role role) {
        this.role = role;
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

//    public Gender getGender() {
//        return gender;
//    }
//
//    public void setGender(Gender gender) {
//        this.gender = gender;
//    }
//
//    public ActivityLevel getActivityLevel() {
//        return activityLevel;
//    }
//
//    public void setActivityLevel(ActivityLevel activityLevel) {
//        this.activityLevel = activityLevel;
//    }
//
//    public String getCurrentNutritionPlanId() {
//        return currentNutritionPlanId;
//    }
//
//    public void setCurrentNutritionPlanId(String currentNutritionPlanId) {
//        this.currentNutritionPlanId = currentNutritionPlanId;
//    }
//
//    public String getTrainerId() {
//        return trainerId;
//    }
//
//    public void setTrainerId(String trainerId) {
//        this.trainerId = trainerId;
//    }
//
//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }
//
//    public LocalDateTime getUpdatedAt() {
//        return updatedAt;
//    }
//
//    public void setUpdatedAt(LocalDateTime updatedAt) {
//        this.updatedAt = updatedAt;
//    }


    @Override
    public String toString() {
        return "MyUser{" +
                "id=" + id +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", height=" + height +
                ", weight=" + weight +
                '}';
    }
    
}
