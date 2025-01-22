package GymFitnessTrackerApplication.service;


import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.ExerciseForm;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.response.MuscleGroupResponse;
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
    public WorkoutPlanResponse getPublicWorkoutPlanById(Long workoutPlanId);
    public WorkoutPlanResponse createNewWorkoutPlan(WorkoutPlanForm workoutPlanform);
    public WorkoutPlanResponse getActiveWorkoutPlan(MyUser user);
    public WorkoutPlanResponse getWorkoutPlanById(Long workoutPlanId);
    public List<ExerciseResponse> listAllExercises();
    public List<ExerciseResponse> listAllNotApprovedExercises();
    public List<ExerciseResponse> listAllExercisesCreatedByUser(MyUser user);
    public ExerciseResponse createExercise(MyUser user, ExerciseForm exerciseForm);
    public MuscleGroupResponse createMuscleGroup(MuscleGroupDTO muscleGroupDTO);
    public Set<MuscleGroupResponse> listAllMuscleGroups();
    public MuscleGroupResponse getMuscleGroupById(Long id);
    public ExerciseResponse getExerciseById(Long id);
    public ExerciseResponse updateExercise(Long id, ExerciseForm exerciseForm);
    public MuscleGroupResponse updateMuscleGroup(Long id, MuscleGroupDTO muscleGroupDTO);
    public WorkoutPlanResponse updateWorkoutPlan(Long id, WorkoutPlanForm workoutPlanForm);
    String uploadFile(final MultipartFile file) throws AmazonClientException;
    void deleteFile(final String fileName);
    String getURLToFile(final String fileName);
    public void deleteWorkoutPlan(Long workoutPlanId);
    public void deleteExercise(Long exerciseId);
}
