package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.model.dao.ExerciseRepo;
import GymFitnessTrackerApplication.model.dao.MyUserRepository;
import GymFitnessTrackerApplication.model.dao.WorkoutPlanRepo;
import GymFitnessTrackerApplication.model.domain.*;
import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.PlannedExerciseDTO;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.WorkoutDTO;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
import GymFitnessTrackerApplication.model.dto.response.PlannedExerciseResponse;
import GymFitnessTrackerApplication.model.dto.response.WorkoutPlanResponse;
import GymFitnessTrackerApplication.model.dto.response.WorkoutResponse;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.WorkoutPlanService;
import com.amazonaws.AmazonClientException;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

@Service
public class WorkoutServiceJpa implements WorkoutPlanService {
    @Autowired
    private WorkoutPlanRepo workoutPlanRepo;
    @Autowired
    private MyUserService myUserService;
    @Autowired
    private MyUserRepository myUserRepo;
    @Autowired
    private ExerciseRepo exerciseRepo;
    @Autowired
    private AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;


    @Override
    public Set<WorkoutPlanResponse> getUserCreatedWorkoutPlans(String userEmail) {
        MyUser user = (MyUser) myUserService.getMyUser(userEmail);
        Set<WorkoutPlan> workoutPlans = workoutPlanRepo.findAllByCreator(user);
        return generateWorkoutPlanResponses(workoutPlans);
    }

    @Override
    public Set<WorkoutPlanResponse> getUsersWorkoutPlans(String userEmail) {
        MyUser user = (MyUser) myUserService.getMyUser(userEmail);
        Set<WorkoutPlan> workoutPlans = workoutPlanRepo.findAllByOwner(user);
        return generateWorkoutPlanResponses(workoutPlans);
    }

    @Override
    public Set<WorkoutPlanResponse> getPublicWorkoutPlans() {
        Set<WorkoutPlan> workoutPlans = workoutPlanRepo.findAllByOwnerIsNull();
        return generateWorkoutPlanResponses(workoutPlans);
    }

    @Override
    public WorkoutPlanResponse getActiveWorkoutPlan(MyUser user) {
        WorkoutPlan workoutPlan = workoutPlanRepo.findActiveWorkoutPlanForUser(user);
        if(workoutPlan == null) {
            return null;
        }
        return generateWorkoutPlanResponse(workoutPlan);
    }

    @Override
    public WorkoutPlanResponse getWorkoutPlanById(Long workoutPlanId) {
        WorkoutPlan workoutPlan = workoutPlanRepo.findById(workoutPlanId).orElse(null);
        if(workoutPlan == null) {
            return null;
        }
        return generateWorkoutPlanResponse(workoutPlan);
    }

    @Override
    public String createNewWorkoutPlan(WorkoutPlanForm workoutPlanForm) {

        MyUser creator = myUserRepo.findById(workoutPlanForm.createdByUserId())
                        .orElseThrow(() -> new UsernameNotFoundException("User doesn't exist."));
        MyUser user = myUserRepo.findById(workoutPlanForm.createdByUserId())
                .orElseThrow(() -> new UsernameNotFoundException("User doesn't exist."));
        WorkoutPlan originalWorkoutPlan=null;
        if(workoutPlanForm.originalWorkoutPlanId()!=null) {
            originalWorkoutPlan = workoutPlanRepo.findById(workoutPlanForm.originalWorkoutPlanId()).orElse(null);
        }

        WorkoutPlan newWorkoutPlan = new WorkoutPlan(workoutPlanForm.name(), workoutPlanForm.description(), creator, user, originalWorkoutPlan);
        String imageName = newWorkoutPlan.getName() + "_" + System.currentTimeMillis();
        newWorkoutPlan.setImage(imageName);
        uploadFile(imageName,workoutPlanForm.image());

        for(WorkoutDTO workout : workoutPlanForm.workouts()){
            Workout newWorkout = new Workout(workout.name(),workout.description(), workout.order(), newWorkoutPlan);
            for(PlannedExerciseDTO PlExercise : workout.exercises()){
                Exercise exercise = exerciseRepo.findById(PlExercise.exerciseId())
                                .orElseThrow(() -> new UsernameNotFoundException("Exercise " + PlExercise.exerciseId() +" doesn't exist"));
                PlannedExercise newPlannedExercise = new PlannedExercise(PlExercise.sets(), PlExercise.reps(),
                                PlExercise.rpe(), PlExercise.order(), exercise, newWorkout);

                newWorkout.addPlannedExercise(newPlannedExercise);
            }
            newWorkoutPlan.addWorkout(newWorkout);
        }
        workoutPlanRepo.save(newWorkoutPlan);

        return getURLToFile(newWorkoutPlan.getImage());
    }


    @Override
    public void uploadFile(String fileName, MultipartFile file) throws AmazonClientException {
        File fFile = convertMultipartFileToFile(file);
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fFile));
    }

    @Override
    public void deleteFile(String fileName) {
        s3Client.deleteObject(bucketName, fileName);
    }

    @Override
    public String getURLToFile(String fileName) {
        Date expiration = new Date(System.currentTimeMillis() + 3600 * 1000);
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

    private Set<WorkoutPlanResponse> generateWorkoutPlanResponses(Set<WorkoutPlan> workoutPlans){
        Set<WorkoutPlanResponse> result = new HashSet<>();
        for(WorkoutPlan workoutPlan : workoutPlans){
            WorkoutPlanResponse wpr = generateWorkoutPlanResponse(workoutPlan);
            result.add(wpr);
        }
        return result;
    }

    private WorkoutPlanResponse generateWorkoutPlanResponse(WorkoutPlan workoutPlan){
            WorkoutPlanResponse wpr = new WorkoutPlanResponse(workoutPlan.getId(), workoutPlan.getName(), workoutPlan.getDescription(),
                    workoutPlan.getImage(), workoutPlan.getCreator().getName(), workoutPlan.getOwner().getName());
            for(Workout workout : workoutPlan.getWorkouts()){
                WorkoutResponse wp = new WorkoutResponse(workout.getId(), workout.getName(), workout.getDescription());
                for(PlannedExercise exercise : workout.getPlannedExercises()){
                    Exercise originalExercise = exerciseRepo.findById(exercise.getExercise().getId()).orElse(null);
                    String exerciseName = "";
                    if(originalExercise!=null) {exerciseName = originalExercise.getName(); }
                    PlannedExerciseResponse per = new PlannedExerciseResponse(exercise.getExercise().getId(), exerciseName,
                                    exercise.getSets(), exercise.getReps(), exercise.getRpe(), exercise.getOrderNumber());
                    wp.addExercise(per);
                }
                wpr.addWorkout(wp);
            }
        return wpr;
    }

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
    public List<ExerciseResponse> listAllNotApprvedExercises() {
        List<Exercise> exercises =  exerciseRepo.findByIsApprovedFalse();
        List<ExerciseResponse> result = new ArrayList<>();
        for(Exercise exercise : exercises){
            ExerciseResponse exerciseResponse = generateExerciseResponse(exercise);
            result.add(exerciseResponse);
        }
        return result;
    }

    private ExerciseResponse generateExerciseResponse(Exercise exercise){
        String gif = getURLToFile(exercise.getGif());
        return new ExerciseResponse(exercise.getId(), exercise.getName(),
                    exercise.getDescription(), gif, exercise.getCreatedByUser().getName(), exercise.isApproved());
    }
}
