package GymFitnessTrackerApplication.service;


import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
import GymFitnessTrackerApplication.model.dto.response.WorkoutPlanResponse;
import com.amazonaws.AmazonClientException;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public interface WorkoutPlanService {
    public WorkoutPlanResponse createNewWorkoutPlan(WorkoutPlanForm workoutPlanform);
    public void deleteWorkoutPlan(Long workoutPlanId, MyUser user);
    public WorkoutPlanResponse updateWorkoutPlan(Long id, WorkoutPlanResponse workoutPlanResponse,  MyUser user);
    public WorkoutPlanResponse getWorkoutPlanById(Long workoutPlanId);
    public Set<WorkoutPlanResponse> listAllWorkoutPlans();
    public Set<WorkoutPlanResponse> getUserCreatedWorkoutPlans(String userEmail);
    public Set<WorkoutPlanResponse> getUsersWorkoutPlans(String userEmail);
    public Set<WorkoutPlanResponse> getPublicWorkoutPlans();
    public WorkoutPlanResponse getPublicWorkoutPlanById(Long workoutPlanId);
    public WorkoutPlanResponse getActiveWorkoutPlan(MyUser user);
    public WorkoutPlanResponse setActiveWorkoutPlan(Long workoutPlanId, MyUser user);
}
