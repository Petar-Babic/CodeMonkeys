package GymFitnessTrackerApplication.model.dto.response;

import java.util.HashSet;
import java.util.Set;

public class WorkoutPlanResponse {
    private final Long id;
    private final String name;
    private final String description;
    private final String image;
    private final Long createdById;
    private final Long userId;
    private final Set<WorkoutResponse> workouts;

    public WorkoutPlanResponse(Long id, String name, String description, String image, Long createdById, Long userId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.createdById = createdById;
        this.userId = userId;
        workouts = new HashSet<>();
    }

    public void addWorkout(WorkoutResponse workoutResponse){
        workouts.add(workoutResponse);
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

    public String getImage() {
        return image;
    }

    public Long getCreatedById() {
        return createdById;
    }

    public Long getUserId() {
        return userId;
    }

    public Set<WorkoutResponse> getWorkouts() {
        return workouts;
    }
}
