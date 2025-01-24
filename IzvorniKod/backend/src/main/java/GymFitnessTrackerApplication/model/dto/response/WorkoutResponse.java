package GymFitnessTrackerApplication.model.dto.response;

import java.util.HashSet;
import java.util.Set;

public class WorkoutResponse {
    private final Long id;
    private final String name;
    private final String description;
    private final Integer order;
    private Set<PlannedExerciseResponse> exercises;

    public WorkoutResponse(Long id, String name, String description, Integer order) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.order = order;
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

    public Integer getOrder() {
        return order;
    }
}
