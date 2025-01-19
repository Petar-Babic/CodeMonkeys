package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.Review;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.PerformedExerciseDTO;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.ReviewDTO;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class WorkoutSessionResponse {

    private final Long workoutId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private final Date date;
    private final ReviewDTO userReview;
    private final ReviewDTO trainerReview;
    private Set<PerformedExerciseDTO> performedExercises;

    public WorkoutSessionResponse(Long workoutId, Date date, ReviewDTO userReview, ReviewDTO trainerReview) {
        this.workoutId = workoutId;
        this.date = date;
        this.userReview = userReview;
        this.trainerReview = trainerReview;
        performedExercises = new HashSet<>();
    }

    public Long getWorkoutId() {
        return workoutId;
    }

    public Date getDate() {
        return date;
    }

    public ReviewDTO getUserReview() {
        return userReview;
    }

    public ReviewDTO getTrainerReview() {
        return trainerReview;
    }

    public Set<PerformedExerciseDTO> getPerformedExercises() {
        return performedExercises;
    }

    public void addPerformedExercise(PerformedExerciseDTO performedExercise) {
        performedExercises.add(performedExercise);
    }
}
