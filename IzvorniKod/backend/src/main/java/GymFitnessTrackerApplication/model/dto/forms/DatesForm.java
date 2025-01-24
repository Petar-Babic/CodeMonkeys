package GymFitnessTrackerApplication.model.dto.forms;

import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record DatesForm (LocalDate startTime, LocalDate endTime) {
}
