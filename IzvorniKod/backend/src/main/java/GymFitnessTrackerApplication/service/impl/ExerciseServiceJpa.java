package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.exception.NonExistantExercise;
import GymFitnessTrackerApplication.model.dao.ExerciseRepo;
import GymFitnessTrackerApplication.model.dao.MuscleGroupRepo;
import GymFitnessTrackerApplication.model.domain.*;
import GymFitnessTrackerApplication.model.dto.forms.ExerciseForm;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
import GymFitnessTrackerApplication.model.dto.response.*;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.MuscleGroupDTO;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.PlannedExerciseDTO;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.WorkoutDTO;
import GymFitnessTrackerApplication.service.ExerciseService;
import com.amazonaws.AmazonClientException;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

        if (exerciseForm.primaryMuscleGroupsIds() != null) {
            exerciseForm.primaryMuscleGroupsIds().forEach(muscleGroupId -> {
                MuscleGroup muscleGroup = muscleGroupRepo.findById(muscleGroupId)
                        .orElseThrow(() -> new EntityNotFoundException("MuscleGroup with id "+ muscleGroupId + " not found."));
                newExercise.addPrimaryMuscleGroup(muscleGroup);
                muscleGroup.addPrimaryToExercises(newExercise);
            });
        }

        if (exerciseForm.secondaryMuscleGroupsIds() != null) {
            exerciseForm.secondaryMuscleGroupsIds().forEach(muscleGroupId -> {
                MuscleGroup muscleGroup = muscleGroupRepo.findById(muscleGroupId)
                        .orElseThrow(() -> new EntityNotFoundException("MuscleGroup with id "+ muscleGroupId + " not found."));
                newExercise.addSecondaryMuscleGroup(muscleGroup);
                muscleGroup.addSecondaryToExercises(newExercise);
            });
        }

        Exercise savedExercise = exerciseRepo.save(newExercise);
        return generateExerciseResponse(savedExercise);
    }

    @Override
    public ExerciseResponse updateExercise(Long id, ExerciseForm exerciseForm) {
        Exercise exercise = exerciseRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("EExercise with "+ id +" not found."));

        exercise.setName(exerciseForm.name());
        exercise.setDescription(exerciseForm.description());
        exercise.setGif(exerciseForm.gif());

        exercise.getPrimaryMuscleGroup().clear();
        exercise.getSecondaryMuscleGroup().clear();

        if (exerciseForm.primaryMuscleGroupsIds() != null) {
            exerciseForm.primaryMuscleGroupsIds().forEach(muscleGroupId -> {
                MuscleGroup muscleGroup = muscleGroupRepo.findById(muscleGroupId)
                        .orElseThrow(() -> new EntityNotFoundException("MuscleGroup with id "+ muscleGroupId + " not found."));
                exercise.addPrimaryMuscleGroup(muscleGroup);
                muscleGroup.addPrimaryToExercises(exercise);
            });
        }

        if (exerciseForm.secondaryMuscleGroupsIds() != null) {
            exerciseForm.secondaryMuscleGroupsIds().forEach(muscleGroupId -> {
                MuscleGroup muscleGroup = muscleGroupRepo.findById(muscleGroupId)
                        .orElseThrow(() -> new EntityNotFoundException("MuscleGroup with id "+ muscleGroupId + " not found."));
                exercise.addSecondaryMuscleGroup(muscleGroup);
                muscleGroup.addSecondaryToExercises(exercise);
            });
        }

        Exercise savedExercise = exerciseRepo.save(exercise);
        return generateExerciseResponse(savedExercise);
    }

    @Override
    public void deleteExercise(Long exerciseId) {
        Exercise exercise = exerciseRepo.findById(exerciseId).
                orElseThrow(() -> new NonExistantExercise("Exercise with "+exerciseId+"not found"));
        //String fileName = exercise.getGif();
        //deleteFile(fileName);
        exerciseRepo.delete(exercise);
    }
    //prepravi s excpetion-om
    @Override
    public ExerciseResponse getExerciseById(Long id) {
        Exercise exercise = exerciseRepo.findById(id).orElse(null);
        if (exercise == null) return null;
        return generateExerciseResponse(exercise);
    }


    private ExerciseResponse generateExerciseResponse(Exercise exercise){
        return new ExerciseResponse(exercise.getId(), exercise.getName(),
                exercise.getDescription(), exercise.getGif(), exercise.getCreatedByUser().getId(), exercise.isApproved(),
                exercise.getPrimaryMuscleGroup().stream().map(MuscleGroup::getId).collect(Collectors.toList()),
                exercise.getSecondaryMuscleGroup().stream().map(MuscleGroup::getId).collect(Collectors.toList()));
    }


    public String uploadFile(MultipartFile file) throws AmazonClientException {
        String fileName = "img_" + System.currentTimeMillis();
        File fFile = convertMultipartFileToFile(file);
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fFile));
        return getURLToFile(fileName);
    }

    public void deleteFile(String fileName) {
        s3Client.deleteObject(bucketName, fileName);
    }

    public String getURLToFile(String fileName) {
        Date expiration = new Date(System.currentTimeMillis() + 365L * 24 * 3600 * 1000);
        return s3Client.generatePresignedUrl(bucketName,fileName,expiration, HttpMethod.GET).toString();
    }
    private File convertMultipartFileToFile(MultipartFile mpFile){
        File convertedFile = new File(mpFile.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)){
            fos.write(mpFile.getBytes());
        }catch(IOException e){
            return null;
        }
        return convertedFile;
    }

}
