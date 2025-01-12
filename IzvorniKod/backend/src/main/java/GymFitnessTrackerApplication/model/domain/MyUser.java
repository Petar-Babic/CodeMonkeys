package GymFitnessTrackerApplication.model.domain;

import GymFitnessTrackerApplication.model.dto.forms.SignupForm;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Entity
public class MyUser{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private Role role;
    private String image;
    private Gender gender;
    private ActivityLevel activityLevel;
    //private String currentNutritionPlanId;
    //trainerID
    private LocalDateTime emailVerified;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

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

    public LocalDateTime getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(LocalDateTime emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Gender getGender() { return gender; }

    public void setGender(Gender gender) { this.gender = gender; }


    public ActivityLevel getActivityLevel() { return activityLevel; }

    public void setActivityLevel(ActivityLevel activityLevel) { this.activityLevel = activityLevel; }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public MyUser(){}

    //konstruktor sa podatcima iz signup forme
    public MyUser(@RequestBody SignupForm signupForm){
        email=signupForm.getEmail();
        name = signupForm.getName();
        password = signupForm.getEncodedPass();
        this.setCreatedAt(LocalDateTime.now());
        // for purposes of testing
        this.role = Role.USER;
        //this.activityLevel=ActivityLevel.SEDENTARY;
    }

    @Override
    public String toString() {
        return "MyUser{" +
                "id=" + id +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
              //  ", height=" + height +
              //  ", weight=" + weight +
                '}';
    }

}
