package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.dto.workoutDTOs.PerformedSetDTO;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.Set;

public record PerformedExerciseResponse (Long id,
                                         @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")Date date,
                                         Set<PerformedSetDTO> performedSets) {
}
