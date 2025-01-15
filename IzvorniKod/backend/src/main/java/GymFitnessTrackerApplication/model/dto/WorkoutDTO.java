package GymFitnessTrackerApplication.model.dto;


import java.util.List;

public record WorkoutDTO (String name, String description, Integer order, List<PlannedExerciseDTO> exercises) {

}
