package GymFitnessTrackerApplication.service;


import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.WorkoutPlan;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
import com.amazonaws.AmazonClientException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface WorkoutPlanService {
    public List<WorkoutPlan> getUserWorkoutPlans(MyUser user);
    public List<WorkoutPlan> getPublicWorkoutPlans();
    public String createNewWorkoutPlan(WorkoutPlanForm workoutPlanform);
    void uploadFile(final String fileName, final MultipartFile file) throws AmazonClientException;
    void deleteFile(final String fileName);
    String getURLToFile(final String fileName);
}
