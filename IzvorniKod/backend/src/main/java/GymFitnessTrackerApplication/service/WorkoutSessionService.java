package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutSessionForm;
import GymFitnessTrackerApplication.model.dto.response.WorkoutSessionResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.ReviewDTO;

import java.util.Date;
import java.util.Set;

public interface WorkoutSessionService {
    public WorkoutSessionResponse createWorkoutSession(WorkoutSessionForm workoutSessionForm, MyUser user);
    public WorkoutSessionResponse updateWorkoutSession(Long workoutSessionId, WorkoutSessionResponse workoutSessionResponse, MyUser user);
    public void deleteWorkoutSession(Long workoutSessionId, MyUser user);
    public WorkoutSessionResponse getWorkoutSession(Long workoutSessionId);
    public Set<WorkoutSessionResponse> getWorkoutSessionsBetweenDates(MyUser user, Date starDate, Date endDate);
    public Set<WorkoutSessionResponse> getWorkoutSessionsForUser(MyUser user);
    public ReviewDTO createTrainerReview(Long workoutSessionId, ReviewDTO reviewDTO, MyUser trainer);
}
