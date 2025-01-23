package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class PlannedExercise {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;
    private Integer sets;
    private Integer reps;
    private Integer rpe;
    private Integer orderNumber;
    @ManyToOne
    @JoinColumn(name = "workout_id", referencedColumnName = "id")
    private Workout workout;
    @OneToMany(mappedBy = "plannedExercise")
    private Set<PerformedExercises> performedExercises;


    public PlannedExercise() {}

    public PlannedExercise(Integer sets, Integer reps, Integer rpe, Integer order, Exercise exercise, Workout workout) {
        this.sets = sets;
        this.reps = reps;
        this.rpe = rpe;
        this.orderNumber = order;
        this.exercise = exercise;
        this.workout = workout;
    }

    public Long getId() {
        return id;
    }

    public Integer getSets() {
        return sets;
    }

    public Integer getReps() {
        return reps;
    }

    public Integer getRpe() {
        return rpe;
    }

    public Integer getOrderNumber() {
        return orderNumber;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public Workout getWorkout() {
        return workout;
    }

    public Set<PerformedExercises> getPerformedExercises() {
        return performedExercises;
    }
}
