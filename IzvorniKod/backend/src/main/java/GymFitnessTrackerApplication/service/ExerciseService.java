package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.ExerciseForm;
import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;

import java.util.List;

public interface ExerciseService {
    public List<ExerciseResponse> listAllExercises();
    public List<ExerciseResponse> listAllExercisesCreatedByUser(MyUser user);
    public ExerciseResponse createExercise(MyUser user, ExerciseForm exerciseForm);
    public ExerciseResponse updateExercise(Long id, ExerciseForm exerciseForm);
    public void deleteExercise(Long exerciseId);
    public ExerciseResponse getExerciseById(Long id);
    public List<ExerciseResponse> listAllApprovedExercises();

}
