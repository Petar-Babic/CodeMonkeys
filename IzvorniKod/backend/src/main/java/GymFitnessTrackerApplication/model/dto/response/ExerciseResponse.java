package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.MyUser;

public record ExerciseResponse (Long id, String name, String description, String gif, Long createdByUserId, boolean isApproved) {
}