package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.Exercise;
import GymFitnessTrackerApplication.model.domain.PlannedExercise;

import java.util.HashSet;
import java.util.Set;

public class WorkoutResponse {
    private Long id;
    private String name;
    private String description;
    private Set<PlannedExerciseResponse> exercises;

    public WorkoutResponse(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
        exercises = new HashSet<>();
    }
    public void addExercise(PlannedExerciseResponse exercise) {
        exercises.add(exercise);
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

    public Set<PlannedExerciseResponse> getExercises() {
        return exercises;
    }
}