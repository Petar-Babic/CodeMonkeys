package GymFitnessTrackerApplication.service;


import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.ExerciseForm;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.response.WorkoutPlanResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.MuscleGroupDTO;
import com.amazonaws.AmazonClientException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface WorkoutPlanService {
    public Set<WorkoutPlanResponse> listAllWorkoutPlans();
    public Set<WorkoutPlanResponse> getUserCreatedWorkoutPlans(String userEmail);
    public Set<WorkoutPlanResponse> getUsersWorkoutPlans(String userEmail);
    public Set<WorkoutPlanResponse> getPublicWorkoutPlans();
    public String createNewWorkoutPlan(WorkoutPlanForm workoutPlanform);
    public void updateWorkoutPlan(Long wpId, WorkoutPlanForm workoutPlanform);
    public void deleteWorkoutPlan(Long workoutPlanId);
    public WorkoutPlanResponse getActiveWorkoutPlan(MyUser user);
    public WorkoutPlanResponse getWorkoutPlanById(Long workoutPlanId);
    String uploadFile(final MultipartFile file) throws AmazonClientException;
    void deleteFile(final String fileName);
    String getURLToFile(final String fileName);
}
