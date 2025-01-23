package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.exception.ForbiddenActionException;
import GymFitnessTrackerApplication.exception.NonExistantEntityException;
import GymFitnessTrackerApplication.model.dao.ExerciseRepo;
import GymFitnessTrackerApplication.model.dao.MuscleGroupRepo;
import GymFitnessTrackerApplication.model.dao.MyUserRepository;
import GymFitnessTrackerApplication.model.dao.WorkoutPlanRepo;
import GymFitnessTrackerApplication.model.domain.*;
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
public class WorkoutPlanServiceJpa implements WorkoutPlanService {
    @Autowired
    private WorkoutPlanRepo workoutPlanRepo;
    @Autowired
    private MyUserService myUserService;
    @Autowired
    private MyUserRepository myUserRepo;
    @Autowired
    private ExerciseRepo exerciseRepo;
    @Autowired
    private MuscleGroupRepo muscleGroupRepo;
    @Autowired
    private AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;


    @Override
    public WorkoutPlanResponse createNewWorkoutPlan(WorkoutPlanForm workoutPlanForm) {
        MyUser creator = myUserRepo.findById(workoutPlanForm.createdByUserId())
                .orElseThrow(() -> new UsernameNotFoundException("User with id " + workoutPlanForm.createdByUserId() +" not found."));
        MyUser user = myUserRepo.findById(workoutPlanForm.userId())
                .orElseThrow(() -> new UsernameNotFoundException("User with id " + workoutPlanForm.createdByUserId() +" not found."));
        WorkoutPlan originalWorkoutPlan=null;
        if(workoutPlanForm.originalWorkoutPlanId()!=null) {
            originalWorkoutPlan = workoutPlanRepo.findById(workoutPlanForm.originalWorkoutPlanId()).orElse(null);
        }

        WorkoutPlan newWorkoutPlan = new WorkoutPlan(workoutPlanForm.name(), workoutPlanForm.description(), creator, user, originalWorkoutPlan);
        newWorkoutPlan.setImage(workoutPlanForm.image());

        for(WorkoutDTO workout : workoutPlanForm.workouts()){
            Workout newWorkout = new Workout(workout.name(),workout.description(), workout.order(), newWorkoutPlan);
            for(PlannedExerciseDTO PlExercise : workout.exercises()){
                Exercise exercise = exerciseRepo.findById(PlExercise.exerciseId())
                        .orElseThrow(() -> new NonExistantEntityException("Exercise with id " + PlExercise.exerciseId() +" not found."));
                PlannedExercise newPlannedExercise = new PlannedExercise(PlExercise.sets(), PlExercise.reps(),
                        PlExercise.rpe(), PlExercise.order(), exercise, newWorkout);

                newWorkout.addPlannedExercise(newPlannedExercise);
            }
            newWorkoutPlan.addWorkout(newWorkout);
        }
        workoutPlanRepo.save(newWorkoutPlan);

        return generateWorkoutPlanResponse(newWorkoutPlan);
    }

    @Override
    public void deleteWorkoutPlan(Long workoutPlanId, MyUser user) {
        WorkoutPlan workoutPlan = workoutPlanRepo.findById(workoutPlanId)
                .orElseThrow(()-> new NonExistantEntityException("Workout with id " + workoutPlanId + " not found."));
        if(workoutPlan.getOwner()!=user || (workoutPlan.getOwner()==null && user.getRole().equals(Role.ADMIN))) {
            throw new ForbiddenActionException("You have no permission to delete this workout plan.");
        }
        workoutPlanRepo.delete(workoutPlan);
    }

    //treba popravit da ne obrise stare workoute nego ih samo prepravi
    //mouzda napraviti da prima ExerciseResponse, a ne form jer mi trebaju id-evi svega
    @Override
    public WorkoutPlanResponse updateWorkoutPlan(Long id, WorkoutPlanForm workoutPlanForm, MyUser user) {
        WorkoutPlan workoutPlan = workoutPlanRepo.findById(id)
                .orElseThrow(() -> new NonExistantEntityException("Workout plan with id "+ id + " not found"));
        if(workoutPlan.getOwner()!=user) {
            throw new ForbiddenActionException("You have no permission to update this workout plan.");
        }

        workoutPlan.setName(workoutPlanForm.name());
        workoutPlan.setDescription(workoutPlanForm.description());
        if (workoutPlanForm.image() != null) {
            workoutPlan.setImage(workoutPlanForm.image());
        }
        // Clear existing workouts
        workoutPlan.getWorkouts().clear();
        // Add new workouts
        for(WorkoutDTO workout : workoutPlanForm.workouts()){
            Workout newWorkout = new Workout(workout.name(), workout.description(), workout.order(), workoutPlan);
            for(PlannedExerciseDTO PlExercise : workout.exercises()){
                Exercise exercise = exerciseRepo.findById(PlExercise.exerciseId())
                        .orElseThrow(() -> new NonExistantEntityException("Exercise " + PlExercise.exerciseId() +" not found."));
                PlannedExercise newPlannedExercise = new PlannedExercise(PlExercise.sets(), PlExercise.reps(),
                        PlExercise.rpe(), PlExercise.order(), exercise, newWorkout);

                newWorkout.addPlannedExercise(newPlannedExercise);
            }
            workoutPlan.addWorkout(newWorkout);
        }
        workoutPlanRepo.save(workoutPlan);
        return generateWorkoutPlanResponse(workoutPlan);
    }

    @Override
    public WorkoutPlanResponse updateWorkoutPlan2(Long id, WorkoutPlanResponse workoutPlanResponse, MyUser user) {
        WorkoutPlan workoutPlan = workoutPlanRepo.findById(id)
                .orElseThrow(()-> new NonExistantEntityException("Workout plan with id "+id+" not found."));
        if(workoutPlan.getOwner()!=user) {
            throw new ForbiddenActionException("You have no permission to update this workout session.");
        }



        return null;
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
    public Set<WorkoutPlanResponse> listAllWorkoutPlans() {
        Set<WorkoutPlan> workoutPlans = new HashSet<>(workoutPlanRepo.findAll());
        return generateWorkoutPlanResponses(workoutPlans);
    }

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

    //zasto ovo?
    @Override
    public WorkoutPlanResponse getPublicWorkoutPlanById(Long workoutPlanId) {
        WorkoutPlan workoutPlan = workoutPlanRepo.findById(workoutPlanId)
                .orElseThrow(()-> new NonExistantEntityException("Workout plan with id " + workoutPlanId + " not found."));
        return generateWorkoutPlanResponse(workoutPlan);
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
                workoutPlan.getImage(), workoutPlan.getCreator().getId(), workoutPlan.getOwner().getId());
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
    public String uploadFile(MultipartFile file) throws AmazonClientException {
        String fileName = "img_" + System.currentTimeMillis();
        File fFile = convertMultipartFileToFile(file);
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fFile));
        return getURLToFile(fileName);
    }

    @Override
    public void deleteFile(String fileName) {
        s3Client.deleteObject(bucketName, fileName);
    }

    @Override
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
