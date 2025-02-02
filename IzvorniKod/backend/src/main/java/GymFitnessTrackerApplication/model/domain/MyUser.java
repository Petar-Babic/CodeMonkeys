package GymFitnessTrackerApplication.model.domain;

import GymFitnessTrackerApplication.model.dto.forms.SignupForm;
import jakarta.persistence.*;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.ArrayList;
import java.util.List;

@Entity
public class MyUser{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(unique = true, nullable = false)
    private String email;
    private Boolean emailVerified;
    private String password;
    private Role role;
    private String image;
    private ActivityLevel activityLevel;
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private MyUser trainer;

    @JsonIgnore
    @OneToMany(mappedBy = "owner")
    private Set<WorkoutPlan> usedWorkoutPlans = new HashSet<>();
    @JsonIgnore
    @OneToMany(mappedBy = "creator")
    private Set<WorkoutPlan> createdWorkoutPlans = new HashSet<>();
 /*   @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "currrentNutrionPlan"
    private NutrionPlan currentNutrionPlan;*/
    @OneToMany(mappedBy = "user")
    private Set<WorkoutSession> workoutSessions;

    @OneToMany(mappedBy = "myUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NutrionPlan> nutrionPlans;

    public List<NutrionPlan> getNutrionPlans() {
        return nutrionPlans;
    }

    public void setNutrionPlans(List<NutrionPlan> nutrionPlans) {
        this.nutrionPlans = nutrionPlans;
    }

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
//
    public Gender getGender() { return gender; }
//
    public void setGender(Gender gender) { this.gender = gender; }
//
//
    public ActivityLevel getActivityLevel() { return activityLevel; }
//
    public void setActivityLevel(ActivityLevel activityLevel) {
        this.activityLevel = activityLevel;
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

    public MyUser(){
        this.nutrionPlans = new ArrayList<>();
    }

    public MyUser getTrainer() {
        return trainer;
    }

    public void setTrainer(MyUser trainer) {
        this.trainer = trainer;
    }

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
        this.setTrainer(null);
        this.nutrionPlans = new ArrayList<>();
        this.workoutSessions = new HashSet<>();
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

    public Set<WorkoutPlan> getUsedWorkoutPlans() {
        return usedWorkoutPlans;
    }

    public void addUsedWorkoutPlan(WorkoutPlan workoutPlan) {
        usedWorkoutPlans.add(workoutPlan);
    }

    public Set<WorkoutPlan> getCreatedWorkoutPlans() {
        return createdWorkoutPlans;
    }

    public void addCreatedWorkoutPlan(WorkoutPlan workoutPlan) {
        createdWorkoutPlans.add(workoutPlan);
    }

    public Set<WorkoutSession> getWorkoutSessions() {
        return workoutSessions;
    }

    public void addWorkoutSession(WorkoutSession workoutSession) {
        workoutSessions.add(workoutSession);
    }
}
