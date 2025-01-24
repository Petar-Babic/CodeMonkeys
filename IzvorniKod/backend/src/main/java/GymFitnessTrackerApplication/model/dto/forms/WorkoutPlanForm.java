package GymFitnessTrackerApplication.model.dto.forms;

import GymFitnessTrackerApplication.model.dto.workoutDTOs.WorkoutDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record WorkoutPlanForm(String name, String description, String image,
                              Long userId, Long createdByUserId, Long originalWorkoutPlanId, List<WorkoutDTO> workouts) {

}
