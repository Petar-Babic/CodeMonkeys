package GymFitnessTrackerApplication.model.dto.workoutDTOs;

import GymFitnessTrackerApplication.model.domain.PerformedExercises;

import java.util.Date;

public record PerfExerciseRepoDTO (PerformedExercises performedExercise, Date date) {
}
