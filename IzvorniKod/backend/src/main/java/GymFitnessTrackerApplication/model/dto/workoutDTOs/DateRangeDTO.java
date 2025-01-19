package GymFitnessTrackerApplication.model.dto.workoutDTOs;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public record DateRangeDTO(
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy") Date startDate,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy") Date endDate
) {}