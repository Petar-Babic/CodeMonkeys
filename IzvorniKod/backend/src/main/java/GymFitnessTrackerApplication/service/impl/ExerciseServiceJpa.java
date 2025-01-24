package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.exception.ForbiddenActionException;
import GymFitnessTrackerApplication.model.dao.ExerciseRepo;
import GymFitnessTrackerApplication.model.dao.MuscleGroupRepo;
import GymFitnessTrackerApplication.model.dao.PlannedExerciseRepo;
import GymFitnessTrackerApplication.model.domain.*;
import GymFitnessTrackerApplication.model.dto.forms.ExerciseForm;
import GymFitnessTrackerApplication.model.dto.response.*;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.PerfExerciseRepoDTO;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.PerformedSetDTO;
import GymFitnessTrackerApplication.service.ExerciseService;
import com.amazonaws.AmazonClientException;
import GymFitnessTrackerApplication.exception.NonExistantEntityException;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExerciseServiceJpa implements ExerciseService {

    @Autowired
    private ExerciseRepo exerciseRepo;
    @Autowired
    private MuscleGroupRepo muscleGroupRepo;
    @Autowired
    private AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    @Autowired
    private PlannedExerciseRepo plannedExerciseRepo;

    @Override
    public List<ExerciseResponse> listAllExercises() {
        List<Exercise> exercises =  exerciseRepo.findAll();
        List<ExerciseResponse> result = new ArrayList<>();
        for(Exercise exercise : exercises){
            ExerciseResponse exerciseResponse = generateExerciseResponse(exercise);
            result.add(exerciseResponse);
        }
        return result;
    }

    @Override
    public List<ExerciseResponse> listAllApprovedExercises() {
        List<Exercise> exercises =  exerciseRepo.findByIsApprovedTrue();
        List<ExerciseResponse> result = new ArrayList<>();
        for(Exercise exercise : exercises){
            ExerciseResponse exerciseResponse = generateExerciseResponse(exercise);
            result.add(exerciseResponse);
        }
        return result;
    }

    @Override
    public Set<PerformedExerciseResponse> listExerciseHistoryForUser(MyUser user, Long exerciseId) {
        Exercise exercise = exerciseRepo.findById(exerciseId)
                .orElseThrow(()-> new NonExistantEntityException("Exercise with id " + exerciseId + " not found"));
        List<PerfExerciseRepoDTO> repoObjects = plannedExerciseRepo.findPerformedExerciseHistory(user, exercise);
        Set<PerformedExerciseResponse> result = new HashSet<>();
        for(PerfExerciseRepoDTO repoObject : repoObjects){
            Set<PerformedSetDTO> performedSetDTOS = new HashSet<>();
            for(PerformedSet performedSet : repoObject.performedExercise().getPerformedSets()){
                PerformedSetDTO performedSetDTO = new PerformedSetDTO(performedSet.getId(),performedSet.getReps(), performedSet.getRpe(), performedSet.getWeight());
                performedSetDTOS.add(performedSetDTO);
            }
            PerformedExerciseResponse performedExerciseResponse = new PerformedExerciseResponse(repoObject.performedExercise().getId(), repoObject.date(), performedSetDTOS);
            result.add(performedExerciseResponse);
        }
        return result;
    }

    @Override
    public void approveExercise(Long exerciseId) {
        Exercise exercise = exerciseRepo.findById(exerciseId)
                .orElseThrow(() -> new NonExistantEntityException("Exercise with "+ exerciseId +" not found."));
        exercise.setApproved(true);
        exerciseRepo.save(exercise);
    }

    @Override
    public List<ExerciseResponse> listAllExercisesCreatedByUser(MyUser user) {
        List<Exercise> exercises = exerciseRepo.findByCreatedByUser(user);
        List<ExerciseResponse> result = new ArrayList<>();
        for(Exercise e : exercises){
            ExerciseResponse exerciseResponse = generateExerciseResponse(e);
            result.add(exerciseResponse);
        }

        return result;
    }

    @Override
    public ExerciseResponse createExercise(MyUser user, ExerciseForm exerciseForm) {
        Exercise newExercise = new Exercise(exerciseForm.name(), exerciseForm.description(), exerciseForm.gif(), user);

        System.out.println("pirmary : "+exerciseForm.primaryMuscleGroupIds());
        if (exerciseForm.primaryMuscleGroupIds() != null) {
            exerciseForm.primaryMuscleGroupIds().forEach(muscleGroupId -> {
                MuscleGroup muscleGroup = muscleGroupRepo.findById(muscleGroupId)
                        .orElseThrow(() -> new NonExistantEntityException("MuscleGroup with id "+ muscleGroupId + " not found."));
                newExercise.addPrimaryMuscleGroup(muscleGroup);
                muscleGroup.addPrimaryToExercises(newExercise);
            });
        }

        if (exerciseForm.secondaryMuscleGroupIds() != null) {
            exerciseForm.secondaryMuscleGroupIds().forEach(muscleGroupId -> {
                MuscleGroup muscleGroup = muscleGroupRepo.findById(muscleGroupId)
                        .orElseThrow(() -> new NonExistantEntityException("MuscleGroup with id "+ muscleGroupId + " not found."));
                newExercise.addSecondaryMuscleGroup(muscleGroup);
                muscleGroup.addSecondaryToExercises(newExercise);
            });
        }
        if(user.getRole().equals(Role.ADMIN))
            newExercise.setApproved(true);
        Exercise savedExercise = exerciseRepo.save(newExercise);
        return generateExerciseResponse(savedExercise);
    }

    //mouzda napraviti da prima ExerciseResponse, a ne form jer mi trebaju id-evi svega
    @Override
    public ExerciseResponse updateExercise(Long id, ExerciseForm exerciseForm, MyUser user) {
        Exercise exercise = exerciseRepo.findById(id)
                .orElseThrow(() -> new NonExistantEntityException("Exercise with "+ id +" not found."));
        if(exercise.getCreatedByUser()!=user) {
            throw new ForbiddenActionException("You have no permission to update this exercise.");
        }
        if(exerciseForm.name()!=null)
            exercise.setName(exerciseForm.name());
        if(exerciseForm.description()!=null)
            exercise.setDescription(exerciseForm.description());
        if(exerciseForm.gif()!=null)
            exercise.setGif(exerciseForm.gif());

        for (MuscleGroup muscleGroup : exercise.getPrimaryMuscleGroup()) {
            muscleGroup.getPrimaryToExercises().remove(exercise);
        }
        for (MuscleGroup muscleGroup : exercise.getSecondaryMuscleGroup()) {
            muscleGroup.getSecondaryToExercises().remove(exercise);
        }

        exercise.getPrimaryMuscleGroup().clear();
        exercise.getSecondaryMuscleGroup().clear();

        if (exerciseForm.primaryMuscleGroupIds() != null) {
            exerciseForm.primaryMuscleGroupIds().forEach(muscleGroupId -> {
                MuscleGroup muscleGroup = muscleGroupRepo.findById(muscleGroupId)
                        .orElseThrow(() -> new NonExistantEntityException("MuscleGroup with id "+ muscleGroupId + " not found."));
                exercise.addPrimaryMuscleGroup(muscleGroup);
                muscleGroup.addPrimaryToExercises(exercise);
            });
        }

        if (exerciseForm.secondaryMuscleGroupIds() != null) {
            exerciseForm.secondaryMuscleGroupIds().forEach(muscleGroupId -> {
                MuscleGroup muscleGroup = muscleGroupRepo.findById(muscleGroupId)
                        .orElseThrow(() -> new NonExistantEntityException("MuscleGroup with id "+ muscleGroupId + " not found."));
                exercise.addSecondaryMuscleGroup(muscleGroup);
                muscleGroup.addSecondaryToExercises(exercise);
            });
        }

        Exercise savedExercise = exerciseRepo.save(exercise);
        return generateExerciseResponse(savedExercise);
    }

    @Override
    public void deleteExercise(Long exerciseId, MyUser user) {
        Exercise exercise = exerciseRepo.findById(exerciseId).
                orElseThrow(() -> new NonExistantEntityException("Exercise with "+exerciseId+" not found"));
        if(exercise.getCreatedByUser()!=user || !user.getRole().equals(Role.ADMIN)) {
            throw new ForbiddenActionException("You have no permission to delete this exercise.");
        }
        for (MuscleGroup muscleGroup : exercise.getPrimaryMuscleGroup()) {
            muscleGroup.getPrimaryToExercises().remove(exercise);
        }
        for (MuscleGroup muscleGroup : exercise.getSecondaryMuscleGroup()) {
            muscleGroup.getSecondaryToExercises().remove(exercise);
        }

        exercise.getPrimaryMuscleGroup().clear();
        exercise.getSecondaryMuscleGroup().clear();

        exerciseRepo.delete(exercise);
    }
    @Override
    public ExerciseResponse getExerciseById(Long id) {
        Exercise exercise = exerciseRepo.findById(id)
                .orElseThrow(()-> new NonExistantEntityException("Exercise with id "+ id + " not found."));
        return generateExerciseResponse(exercise);
    }


    private ExerciseResponse generateExerciseResponse(Exercise exercise){
        return new ExerciseResponse(exercise.getId(), exercise.getName(),
                exercise.getDescription(), exercise.getGif(), exercise.getCreatedByUser().getId(), exercise.isApproved(),
                exercise.getPrimaryMuscleGroup().stream().map(MuscleGroup::getId).collect(Collectors.toList()),
                exercise.getSecondaryMuscleGroup().stream().map(MuscleGroup::getId).collect(Collectors.toList()));
    }

}
