package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Workout {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String description;
    private Integer order;
    @ManyToOne
    @JoinColumn(name = "workout_plan_id")
    private WorkoutPlan workoutPlan;
    @OneToMany(mappedBy = "workout")
    private Set<PlannedExercise> plannedExerciseExercises;

    public Workout() {}

    public Workout(String name, String description, Integer order, WorkoutPlan workoutPlan) {
        this.name = name;
        this.description = description;
        this.order = order;
        this.workoutPlan = workoutPlan;
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

    public Integer getOrder() {
        return order;
    }

    public WorkoutPlan getWorkoutPlan() {
        return workoutPlan;
    }

    public Set<PlannedExercise> getPlannedExerciseExercises() {
        return plannedExerciseExercises;
    }
}
