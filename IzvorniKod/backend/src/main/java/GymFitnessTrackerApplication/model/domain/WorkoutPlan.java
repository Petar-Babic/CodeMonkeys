package GymFitnessTrackerApplication.model.domain;

import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
import jakarta.persistence.*;
import net.minidev.json.annotate.JsonIgnore;

import java.util.HashSet;
import java.util.Set;

@Entity
public class WorkoutPlan {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String image;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "created_by_user_id")
    private MyUser creator;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "owner_user_id",nullable = true)
    private MyUser owner;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "original_workout_plan_id")
    private WorkoutPlan originalWorkoutPlan;
    @OneToMany(mappedBy = "workoutPlan", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Workout> workouts;
    private boolean isActive=false;


    public WorkoutPlan(String name, String description, MyUser creator, MyUser owner, WorkoutPlan originalWorkoutPlan) {
        this.name = name;
        this.description = description;
        this.creator = creator;
        this.owner = owner;
        this.originalWorkoutPlan = originalWorkoutPlan;
        workouts = new HashSet<>();
    }
    public WorkoutPlan(String name, String description, MyUser creator, MyUser owner) {
        this.name = name;
        this.description = description;
        this.creator = creator;
        this.owner = owner;
        this.originalWorkoutPlan = null;
        workouts = new HashSet<>();
    }

    public WorkoutPlan() {
        workouts = new HashSet<>();
    }

    public WorkoutPlan(MyUser user, WorkoutPlanForm workoutPlanForm) {
        this.creator = user;
        this.name = workoutPlanForm.name();
        this.description = workoutPlanForm.description();
    }


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public MyUser getCreator() {
        return creator;
    }

    public void setCreator(MyUser creator) {
        this.creator = creator;
    }

    public MyUser getOwner() {
        return owner;
    }

    public void setOwner(MyUser owner) {
        this.owner = owner;
    }

    public WorkoutPlan getOriginalWorkoutPlan() {
        return originalWorkoutPlan;
    }

    public void setOriginalWorkoutPlan(WorkoutPlan originalWorkoutPlan) {
        this.originalWorkoutPlan = originalWorkoutPlan;
    }

    public Set<Workout> getWorkouts() {
        return workouts;
    }

    public void addWorkout(Workout workout) {
        workouts.add(workout);
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public void setWorkouts(Set<Workout> workouts) {
        this.workouts = workouts;
    }
}
