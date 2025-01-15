package GymFitnessTrackerApplication.model.dto.forms;

import GymFitnessTrackerApplication.model.domain.Workout;
import GymFitnessTrackerApplication.model.domain.WorkoutPlan;
import GymFitnessTrackerApplication.model.dto.WorkoutDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record WorkoutPlanForm(String name, String description, MultipartFile image,
                              Long userId, Long createdByUserId, Long originalWorkoutPlanId, List<WorkoutDTO> workouts) {

}
