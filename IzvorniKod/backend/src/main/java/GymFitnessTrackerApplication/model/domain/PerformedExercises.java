package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class PerformedExercises {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "workout_session_id")
    private WorkoutSession workoutSession;
    @ManyToOne
    @JoinColumn(name = "planned_exercise_id")
    private PlannedExercise plannedExercise;
    @OneToMany(mappedBy = "performedExercise", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PerformedSet> performedSets;

    public PerformedExercises(WorkoutSession workoutSession, PlannedExercise plannedExercise) {
        this.workoutSession = workoutSession;
        this.plannedExercise = plannedExercise;
        this.performedSets = new HashSet<>();
    }

    public PerformedExercises() {}

    public Long getId() {
        return id;
    }

    public WorkoutSession getWorkoutSession() {
        return workoutSession;
    }

    public PlannedExercise getPlannedExercise() {
        return plannedExercise;
    }

    public Set<PerformedSet> getPerformedSets() {
        return performedSets;
    }

    public void addPerformedSet(PerformedSet performedSet) {
        performedSets.add(performedSet);
    }
}
