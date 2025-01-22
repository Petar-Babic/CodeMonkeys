package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.model.dao.ExerciseRepo;
import GymFitnessTrackerApplication.model.dao.MuscleGroupRepo;
import GymFitnessTrackerApplication.model.dao.MyUserRepository;
import GymFitnessTrackerApplication.model.dao.WorkoutPlanRepo;
import GymFitnessTrackerApplication.model.domain.*;
import GymFitnessTrackerApplication.model.dto.forms.ExerciseForm;
import GymFitnessTrackerApplication.model.dto.response.ExerciseResponse;
import GymFitnessTrackerApplication.model.dto.response.MuscleGroupResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.MuscleGroupDTO;
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
    private MuscleGroupRepo muscleGroupRepo;
    @Autowired
    private AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;


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

    @Override
    public WorkoutPlanResponse getWorkoutPlanById(Long workoutPlanId) {
        WorkoutPlan workoutPlan = workoutPlanRepo.findById(workoutPlanId).orElse(null);
        if(workoutPlan == null) {
            return null;
        }
        return generateWorkoutPlanResponse(workoutPlan);
    }

    @Override
    public WorkoutPlanResponse createNewWorkoutPlan(WorkoutPlanForm workoutPlanForm) {
        MyUser creator = myUserRepo.findById(workoutPlanForm.createdByUserId())
                        .orElseThrow(() -> new UsernameNotFoundException("User doesn't exist."));
        MyUser user = myUserRepo.findById(workoutPlanForm.userId())
                .orElseThrow(() -> new UsernameNotFoundException("User doesn't exist."));
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
                                .orElseThrow(() -> new UsernameNotFoundException("Exercise " + PlExercise.exerciseId() +" doesn't exist"));
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
    public List<ExerciseResponse> listAllNotApprovedExercises() {
        List<Exercise> exercises =  exerciseRepo.findByIsApprovedFalse();
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
        Exercise exercise = new Exercise(exerciseForm.name(), exerciseForm.description(), exerciseForm.gif(), user);

        if (exerciseForm.primaryMuscleGroupsIds() != null) {
            exerciseForm.primaryMuscleGroupsIds().forEach(muscleGroupId -> {
                MuscleGroup muscleGroup = muscleGroupRepo.findById(muscleGroupId)
                        .orElseThrow(() -> new EntityNotFoundException("MuscleGroup not found with id: " + muscleGroupId));
                exercise.addPrimaryMuscleGroup(muscleGroup);
                muscleGroup.addPrimaryToExercises(exercise);
            });
        }

        if (exerciseForm.secondaryMuscleGroupsIds() != null) {
            exerciseForm.secondaryMuscleGroupsIds().forEach(muscleGroupId -> {
                MuscleGroup muscleGroup = muscleGroupRepo.findById(muscleGroupId)
                        .orElseThrow(() -> new EntityNotFoundException("MuscleGroup not found with id: " + muscleGroupId));
                exercise.addSecondaryMuscleGroup(muscleGroup);
                muscleGroup.addSecondaryToExercises(exercise);
            });
        }

        Exercise savedExercise = exerciseRepo.save(exercise);
        return generateExerciseResponse(savedExercise);
    }

    @Override
    public MuscleGroupResponse createMuscleGroup(MuscleGroupDTO muscleGroupDTO) {
        MuscleGroup newMuscleGroup = new MuscleGroup(muscleGroupDTO);
        muscleGroupRepo.save(newMuscleGroup);
        return new MuscleGroupResponse(newMuscleGroup.getId(), newMuscleGroup.getName(), newMuscleGroup.getDescription(), newMuscleGroup.getImage());
    }

    @Override
    public Set<MuscleGroupResponse> listAllMuscleGroups() {
        List<MuscleGroup> muscleGroups = muscleGroupRepo.findAll();
        Set<MuscleGroupResponse> result = new HashSet<>();
        for(MuscleGroup muscleGroup : muscleGroups){
            MuscleGroupResponse mgDto = new MuscleGroupResponse(muscleGroup.getId(), muscleGroup.getName(), muscleGroup.getDescription(), muscleGroup.getImage());
            result.add(mgDto);
        }
        return result;
    }

    @Override
    public WorkoutPlanResponse getPublicWorkoutPlanById(Long workoutPlanId) {
        WorkoutPlan workoutPlan = workoutPlanRepo.findById(workoutPlanId).orElse(null);
        if (workoutPlan == null || workoutPlan.getOwner() != null) {
            return null; // ili bacite iznimku ako je potrebno
        }
        return generateWorkoutPlanResponse(workoutPlan);
    }

    @Override
    public void deleteWorkoutPlan(Long workoutPlanId) {
        workoutPlanRepo.deleteById(workoutPlanId);
    }

    @Override
    public MuscleGroupResponse getMuscleGroupById(Long id) {
        MuscleGroup muscleGroup = muscleGroupRepo.findById(id).orElse(null);
        if (muscleGroup == null) return null;
        return new MuscleGroupResponse(muscleGroup.getId(), muscleGroup.getName(), muscleGroup.getDescription(), muscleGroup.getImage());
    }

    @Override
    public ExerciseResponse getExerciseById(Long id) {
        Exercise exercise = exerciseRepo.findById(id).orElse(null);
        if (exercise == null) return null;
        return generateExerciseResponse(exercise);
    }

    @Override
    public ExerciseResponse updateExercise(Long id, ExerciseForm exerciseForm) {
        Exercise exercise = exerciseRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Exercise not found with id: " + id));

        exercise.setName(exerciseForm.name());
        exercise.setDescription(exerciseForm.description());
        exercise.setGif(exerciseForm.gif());

        exercise.getPrimaryMuscleGroup().clear();
        exercise.getSecondaryMuscleGroup().clear();

        if (exerciseForm.primaryMuscleGroupsIds() != null) {
            exerciseForm.primaryMuscleGroupsIds().forEach(muscleGroupId -> {
                MuscleGroup muscleGroup = muscleGroupRepo.findById(muscleGroupId)
                        .orElseThrow(() -> new EntityNotFoundException("MuscleGroup not found with id: " + muscleGroupId));
                exercise.addPrimaryMuscleGroup(muscleGroup);
                muscleGroup.addPrimaryToExercises(exercise);
            });
        }

        if (exerciseForm.secondaryMuscleGroupsIds() != null) {
            exerciseForm.secondaryMuscleGroupsIds().forEach(muscleGroupId -> {
                MuscleGroup muscleGroup = muscleGroupRepo.findById(muscleGroupId)
                        .orElseThrow(() -> new EntityNotFoundException("MuscleGroup not found with id: " + muscleGroupId));
                exercise.addSecondaryMuscleGroup(muscleGroup);
                muscleGroup.addSecondaryToExercises(exercise);
            });
        }

        Exercise savedExercise = exerciseRepo.save(exercise);
        return generateExerciseResponse(savedExercise);
    }

    @Override
    public MuscleGroupResponse updateMuscleGroup(Long id, MuscleGroupDTO muscleGroupDTO) {
        MuscleGroup muscleGroup = muscleGroupRepo.findById(id).orElse(null);
        if (muscleGroup == null) return null;

        muscleGroup.setName(muscleGroupDTO.name());
        muscleGroup.setDescription(muscleGroupDTO.description());
        if (muscleGroupDTO.image() != null) {
            muscleGroup.setImage(muscleGroupDTO.image());
        }

        muscleGroupRepo.save(muscleGroup);
        return new MuscleGroupResponse(muscleGroup.getId(), muscleGroup.getName(), muscleGroup.getDescription(), muscleGroup.getImage());
    }

    @Override
    public WorkoutPlanResponse updateWorkoutPlan(Long id, WorkoutPlanForm workoutPlanForm) {
        WorkoutPlan workoutPlan = workoutPlanRepo.findById(id).orElse(null);
        if (workoutPlan == null) return null;

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
                        .orElseThrow(() -> new UsernameNotFoundException("Exercise " + PlExercise.exerciseId() +" doesn't exist"));
                PlannedExercise newPlannedExercise = new PlannedExercise(PlExercise.sets(), PlExercise.reps(),
                        PlExercise.rpe(), PlExercise.order(), exercise, newWorkout);

                newWorkout.addPlannedExercise(newPlannedExercise);
            }
            workoutPlan.addWorkout(newWorkout);
        }

        workoutPlanRepo.save(workoutPlan);
        return generateWorkoutPlanResponse(workoutPlan);
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

    private ExerciseResponse generateExerciseResponse(Exercise exercise){
        return new ExerciseResponse(exercise.getId(), exercise.getName(),
                    exercise.getDescription(), exercise.getGif(), exercise.getCreatedByUser().getId(), exercise.isApproved(),
                         exercise.getPrimaryMuscleGroup().stream().map(MuscleGroup::getId).collect(Collectors.toList()),
                    exercise.getSecondaryMuscleGroup().stream().map(MuscleGroup::getId).collect(Collectors.toList()));
    }

    @Override
    public void deleteExercise(Long exerciseId) {
        exerciseRepo.deleteById(exerciseId);
    }
}
