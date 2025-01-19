package GymFitnessTrackerApplication.service;


import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.response.WorkoutPlanResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.MuscleGroupDTO;
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
    public List<ExerciseResponse> listAllNotApprovedExercises();
    public List<ExerciseResponse> listAllExercisesCreatedByUser(MyUser user);
    public void createExercise(MyUser user, String name, String description, MultipartFile file, Set<Long> primaryMuscleGroupIds, Set<Long> secondaryMuscleGroupIds);
    public void createMuscleGroup(String name, String description, MultipartFile file);
    public Set<MuscleGroupDTO> listAllMuscleGroups();
    void uploadFile(final String fileName, final MultipartFile file) throws AmazonClientException;
    void deleteFile(final String fileName);
    String getURLToFile(final String fileName);
}
