package GymFitnessTrackerApplication.model.domain;

import GymFitnessTrackerApplication.model.forms.SignupForm;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Entity
public class MyUser{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "myUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private Goals goals;


    private String name;
    @Column(unique = true, nullable = false)
    private String email;

    private Boolean emailVerified;

    private String password;
    private Role role;

    // korda ti si idiot
    // jebem ti mater
    // zasto je sve krcato

    /*
    Float height;
    Float weight;
     */
   // Gender gender;
    private String image;
   // ActivityLevel activityLevel;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "currrentNutrionPlan")
    private NutrionPlan nutrionPlan;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "currentBodyMeasurement")
    private Measurement bodyMeasurement;


    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "goalBodyMeasurementS")
    private Measurement goalBodyMeasurements;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;
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

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
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

    /*
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
*/

    /*
    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }


    public ActivityLevel getActivityLevel() {
        return activityLevel;
    }

    public void setActivityLevel(ActivityLevel activityLevel) {
        this.activityLevel = activityLevel;
    }

     */

    public void setNutrionPlan(NutrionPlan nutrionPlan) {

        this.nutrionPlan = nutrionPlan;
    }

    public void setBodyMeasurement(Measurement bodyMeasurement) {
        this.bodyMeasurement = bodyMeasurement;
    }

    public void setGoalBodyMeasurements(Measurement goalBodyMeasurements) {
        this.goalBodyMeasurements = goalBodyMeasurements;
    }

    public Goals getGoals() {
        return goals;
    }

    public NutrionPlan getNutrionPlan() {
        return nutrionPlan;
    }

    public Measurement getBodyMeasurement() {
        return bodyMeasurement;
    }

    public Measurement getGoalBodyMeasurements() {
        return goalBodyMeasurements;
    }

    public Trainer getTrainer() {
        return trainer;
    }

    public void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }

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
        this.email=signupForm.getEmail();
        this.name = signupForm.getName();
        this.password = signupForm.getEncodedPass();
        this.emailVerified=false;
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
