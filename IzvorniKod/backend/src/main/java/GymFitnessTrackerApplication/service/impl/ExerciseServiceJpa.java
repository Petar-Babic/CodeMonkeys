package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.exception.NonExistantExercise;
import GymFitnessTrackerApplication.model.dao.ExerciseRepo;
import GymFitnessTrackerApplication.model.dao.MuscleGroupRepo;
import GymFitnessTrackerApplication.model.domain.Exercise;
import GymFitnessTrackerApplication.model.domain.MuscleGroup;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.ExerciseForm;
import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.MuscleGroupDTO;
import GymFitnessTrackerApplication.service.ExerciseService;
import com.amazonaws.AmazonClientException;
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
    public void createExercise(MyUser user, ExerciseForm exerciseForm) {
        Exercise newExercise = new Exercise(exerciseForm.name(), exerciseForm.description(), exerciseForm.gif(), user);
        for(Long pmgId : exerciseForm.primaryMuscleGroupIds()){
            muscleGroupRepo.findById(pmgId).ifPresent(muscleGroup -> {
                newExercise.addPrimaryMuscleGroup(muscleGroup);
                muscleGroup.addPrimaryToExercises(newExercise);
            });
        }
        for(Long smgId : exerciseForm.secondaryMuscleGroupIds()){
            muscleGroupRepo.findById(smgId).ifPresent(muscleGroup -> {
                newExercise.addSecondaryMuscleGroup(muscleGroup);
                muscleGroup.addSecondaryToExercises(newExercise);
            });
        }
        exerciseRepo.save(newExercise);
    }

    @Override
    public void updateExercise(Long exerciseId, ExerciseForm exerciseForm) {
        Exercise exercise = exerciseRepo.findById(exerciseId).orElse(null);
        if(exercise == null){
            throw new NonExistantExercise("Exercise with "+exerciseId+"doesn't exist.");
        }
        exercise.setName(exerciseForm.name());
        exercise.setDescription(exerciseForm.description());
        //provjera za sliku
        for(Long pmgId : exerciseForm.primaryMuscleGroupIds()){
            muscleGroupRepo.findById(pmgId).ifPresent(muscleGroup -> {
                exercise.addPrimaryMuscleGroup(muscleGroup);
                muscleGroup.addPrimaryToExercises(exercise);
            });
        }
        for(Long smgId : exerciseForm.secondaryMuscleGroupIds()){
            muscleGroupRepo.findById(smgId).ifPresent(muscleGroup -> {
                exercise.addSecondaryMuscleGroup(muscleGroup);
                muscleGroup.addSecondaryToExercises(exercise);
            });
        }
        exerciseRepo.save(exercise);
    }

    @Override
    public void deleteExercise(Long exerciseId) {
        Exercise exercise = exerciseRepo.findById(exerciseId).orElse(null);
        if(exercise == null){
            throw new NonExistantExercise("Exercise with "+exerciseId+"doesn't exist.");
        }
        String fileName = exercise.getGif();
        deleteFile(fileName);
        exerciseRepo.delete(exercise);
    }

    @Override
    public void createMuscleGroup(MuscleGroupDTO muscleGroupDTO) {
        MuscleGroup newMuscleGroup = new MuscleGroup(muscleGroupDTO);
        muscleGroupRepo.save(newMuscleGroup);
    }

    @Override
    public Set<MuscleGroupDTO> listAllMuscleGroups() {
        List<MuscleGroup> muscleGroups = muscleGroupRepo.findAll();
        Set<MuscleGroupDTO> result = new HashSet<>();
        for(MuscleGroup muscleGroup : muscleGroups){
            String imageUrl = getURLToFile(muscleGroup.getImage());
            MuscleGroupDTO mgDto = new MuscleGroupDTO(muscleGroup.getName(), muscleGroup.getDescription(), imageUrl);
            result.add(mgDto);
        }
        return result;
    }


    private ExerciseResponse generateExerciseResponse(Exercise exercise){
        String gif = getURLToFile(exercise.getGif());
        return new ExerciseResponse(exercise.getId(), exercise.getName(),
                exercise.getDescription(), gif, exercise.getCreatedByUser().getId(), exercise.isApproved());
    }


    public String uploadFile(MultipartFile file) throws AmazonClientException {
        String fileName = String.valueOf(System.currentTimeMillis());
        File fFile = convertMultipartFileToFile(file);
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fFile));
        return fileName;
    }

    public void deleteFile(String fileName) {
        s3Client.deleteObject(bucketName, fileName);
    }

    public String getURLToFile(String fileName) {
        Date expiration = new Date(System.currentTimeMillis() + 7200 * 1000); //2 sata
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
