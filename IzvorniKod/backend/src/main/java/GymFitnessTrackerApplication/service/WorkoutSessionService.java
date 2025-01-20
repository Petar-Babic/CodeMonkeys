package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutSessionForm;
import GymFitnessTrackerApplication.model.dto.response.WorkoutSessionResponse;

import java.util.Date;
import java.util.Set;

public interface WorkoutSessionService {
    public void createWorkoutSession(WorkoutSessionForm workoutSessionForm, MyUser user);
    public Set<WorkoutSessionResponse> getAllWorkoutSessions(MyUser user);
    public Set<WorkoutSessionResponse> getWorkoutSessionsBetweenDates(MyUser user, Date starDate, Date endDate);
    public Set<WorkoutSessionResponse> getWorkoutSessionsForUser(MyUser user);
}