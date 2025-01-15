package GymFitnessTrackerApplication.model.dto.response;

public record PlannedExerciseResponse (Long exerciseId, Integer sets, Integer reps, Integer rpe,
                                       Integer orderNumber){
}
