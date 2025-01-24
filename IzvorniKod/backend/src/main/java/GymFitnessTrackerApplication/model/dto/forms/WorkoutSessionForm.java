package GymFitnessTrackerApplication.model.dto.forms;

import GymFitnessTrackerApplication.model.dto.workoutDTOs.PerformedExerciseDTO;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.ReviewDTO;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.Set;

public record WorkoutSessionForm (Long workoutId,
                                  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")Date date,
                                  ReviewDTO userReview, Set<PerformedExerciseDTO> performedExercises
) {
}
