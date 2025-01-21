package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.ExerciseForm;
import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.MuscleGroupDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface ExerciseService {
    public List<ExerciseResponse> listAllExercises();
    public List<ExerciseResponse> listAllApprovedExercises();
    public List<ExerciseResponse> listAllExercisesCreatedByUser(MyUser user);
    public void createExercise(MyUser user, ExerciseForm exerciseForm);
    public void updateExercise(Long exerciseId, ExerciseForm exerciseForm);
    public void deleteExercise(Long exerciseId);
    public void createMuscleGroup(MuscleGroupDTO muscleGroupDTO);
    public Set<MuscleGroupDTO> listAllMuscleGroups();
}
