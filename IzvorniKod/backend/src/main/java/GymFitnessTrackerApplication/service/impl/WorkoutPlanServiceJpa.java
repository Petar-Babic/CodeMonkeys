package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.model.dao.WorkoutPlanRepo;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.WorkoutPlan;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
import GymFitnessTrackerApplication.service.WorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutPlanServiceJpa implements WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepo workoutPlanRepo;


    @Override
    public List<WorkoutPlan> getUserWorkoutPlans(MyUser user) {
        return workoutPlanRepo.findByCreator(user);
    }

    @Override
    public List<WorkoutPlan> getPublicWorkoutPlans() {
        return workoutPlanRepo.findByOriginalWorkoutPlanIsNull();
    }

    @Override
    public void addWorkoutPlan(MyUser user, WorkoutPlanForm workoutPlanform) {
        WorkoutPlan workoutPlan = new WorkoutPlan();

    }
}
