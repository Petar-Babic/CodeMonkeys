package GymFitnessTrackerApplication.model.dto.response;

import java.util.List;

import GymFitnessTrackerApplication.model.domain.MyUser;

public record ExerciseResponse (Long id, String name, String description, String gif, Long createdByUserId, boolean isApproved, List<Long> primaryMuscleGroupsIds, List<Long> secondaryMuscleGroupsIds) {
}
