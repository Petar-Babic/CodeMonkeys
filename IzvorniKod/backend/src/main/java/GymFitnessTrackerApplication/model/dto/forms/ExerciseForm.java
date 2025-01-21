package GymFitnessTrackerApplication.model.dto.forms;

import java.util.Set;

public record ExerciseForm (String name, String description, String gif,
                            Set<Long> primaryMuscleGroupIds, Set<Long> secondaryMuscleGroupIds) {}
