package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.MyUser;

public record MuscleGroupResponse (Long id, String name, String description, String image) {
}
