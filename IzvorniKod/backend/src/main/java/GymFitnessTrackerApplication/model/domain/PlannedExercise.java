package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.*;

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
    private Integer order;
    @ManyToOne
    @JoinColumn(name = "workout_id", referencedColumnName = "id")
    private Workout workout;

    public PlannedExercise() {}

    public PlannedExercise(Integer sets, Integer reps, Integer rpe, Integer order, Exercise exercise) {
        this.sets = sets;
        this.reps = reps;
        this.rpe = rpe;
        this.order = order;
        this.exercise = exercise;
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

    public Integer getOrder() {
        return order;
    }

    public Exercise getExercise() {
        return exercise;
    }
}
