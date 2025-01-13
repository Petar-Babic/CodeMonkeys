package GymFitnessTrackerApplication.service;


import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.WorkoutPlan;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;

import java.util.List;

public interface WorkoutPlanService {
    public List<WorkoutPlan> getUserWorkoutPlans(MyUser user);
    public List<WorkoutPlan> getPublicWorkoutPlans();
    public void addWorkoutPlan(MyUser user, WorkoutPlanForm workoutPlanform);
}
