package GymFitnessTrackerApplication.model.dto.response;

public record PlannedExerciseResponse (Long exerciseId, String exerciseName , Integer sets, Integer reps, Integer rpe,
                                       Integer order){
}
