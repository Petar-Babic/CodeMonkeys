package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.*;

@Entity
public class PerformedSet {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "performed_exercise_id")
    private PerformedExercises performedExercise;
    private Integer reps;
    private Integer rpe;
    private Float weight;

    public PerformedSet(PerformedExercises performedExercise, Integer reps, Integer rpe, Float weight) {
        this.performedExercise = performedExercise;
        this.reps = reps;
        this.rpe = rpe;
        this.weight = weight;
    }

    public PerformedSet() {}

    public Long getId() {
        return id;
    }

    public PerformedExercises getPerformedExercise() {
        return performedExercise;
    }

    public Integer getReps() {
        return reps;
    }

    public Integer getRpe() {
        return rpe;
    }

    public Float getWeight() {
        return weight;
    }
}
