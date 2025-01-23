package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Workout {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String description;
    private Integer orderNumber;
    @ManyToOne
    @JoinColumn(name = "workout_plan_id")
    private WorkoutPlan workoutPlan;
    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PlannedExercise> plannedExercises;
    @OneToMany(mappedBy = "workout")
    private Set<WorkoutSession> workoutSessions;

    public Workout() {}

    public Workout(String name, String description, Integer orderNumber, WorkoutPlan workoutPlan) {
        this.name = name;
        this.description = description;
        this.orderNumber = orderNumber;
        this.workoutPlan = workoutPlan;
        plannedExercises = new HashSet<>();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Integer getorderNumber() {
        return orderNumber;
    }

    public WorkoutPlan getWorkoutPlan() {
        return workoutPlan;
    }

    public Set<PlannedExercise> getPlannedExercises() {
        return plannedExercises;
    }

    public void addPlannedExercise(PlannedExercise plannedExercise) {
        plannedExercises.add(plannedExercise);
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    public void setWorkoutPlan(WorkoutPlan workoutPlan) {
        this.workoutPlan = workoutPlan;
    }

    public void setPlannedExercises(Set<PlannedExercise> plannedExercises) {
        this.plannedExercises = plannedExercises;
    }
}
