package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.ExerciseForm;
import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.response.PerformedExerciseResponse;

import java.util.List;
import java.util.Set;

public interface ExerciseService {
    public List<ExerciseResponse> listAllExercises();
    public List<ExerciseResponse> listAllExercisesCreatedByUser(MyUser user);
    public ExerciseResponse createExercise(MyUser user, ExerciseForm exerciseForm);
    public ExerciseResponse updateExercise(Long id, ExerciseForm exerciseForm, MyUser user);
    public void deleteExercise(Long exerciseId, MyUser user);
    public ExerciseResponse getExerciseById(Long id);
    public List<ExerciseResponse> listAllApprovedExercises();
    public Set<PerformedExerciseResponse> listExerciseHistoryForUser(MyUser user, Long exerciseId);
    public void approveExercise(Long exerciseId);

}
