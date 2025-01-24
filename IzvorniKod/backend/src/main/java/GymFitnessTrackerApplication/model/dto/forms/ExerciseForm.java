package GymFitnessTrackerApplication.model.dto.forms;

import java.util.List;

public record ExerciseForm (String name, String description, String gif,
                            List<Long> primaryMuscleGroupIds, List<Long> secondaryMuscleGroupIds) {}
