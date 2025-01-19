package GymFitnessTrackerApplication.model.dto.workoutDTOs;


import java.util.List;

public record WorkoutDTO (String name, String description, Integer order, List<PlannedExerciseDTO> exercises) {

}
