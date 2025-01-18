package GymFitnessTrackerApplication.service;


import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.WorkoutPlan;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.response.WorkoutPlanResponse;
import com.amazonaws.AmazonClientException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface WorkoutPlanService {
    public Set<WorkoutPlanResponse> getUserCreatedWorkoutPlans(String userEmail);
    public Set<WorkoutPlanResponse> getUsersWorkoutPlans(String userEmail);
    public Set<WorkoutPlanResponse> getPublicWorkoutPlans();
    public String createNewWorkoutPlan(WorkoutPlanForm workoutPlanform);
    public WorkoutPlanResponse getActiveWorkoutPlan(MyUser user);
    public WorkoutPlanResponse getWorkoutPlanById(Long workoutPlanId);
    public List<ExerciseResponse> listAllExercises();
    public List<ExerciseResponse> listAllNotApprvedExercises();
    void uploadFile(final String fileName, final MultipartFile file) throws AmazonClientException;
    void deleteFile(final String fileName);
    String getURLToFile(final String fileName);
}
