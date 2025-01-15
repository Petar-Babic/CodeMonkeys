package GymFitnessTrackerApplication.model.dto.response;

import java.util.HashSet;
import java.util.Set;

public class WorkoutPlanResponse {
    private Long id;
    private String name;
    private String description;
    private String image;
    private String creatorName;
    private String ownerName;
    private Set<WorkoutResponse> workouts;

    public WorkoutPlanResponse(Long id, String name, String description, String image, String creatorName, String ownerName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.creatorName = creatorName;
        this.ownerName = ownerName;
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

    public String getCreatorName() {
        return creatorName;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public Set<WorkoutResponse> getWorkouts() {
        return workouts;
    }
}
