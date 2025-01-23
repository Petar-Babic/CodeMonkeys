package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.exception.ForbiddenActionException;
import GymFitnessTrackerApplication.exception.NonExistantEntityException;
import GymFitnessTrackerApplication.exception.RemoveWorkoutException;
import GymFitnessTrackerApplication.model.dao.*;
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
import java.util.stream.Collectors;

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
    private AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    @Autowired
    private WorkoutRepo workoutRepo;
    @Autowired
    private PlannedExerciseRepo plannedExerciseRepo;
    @Autowired
    private WorkoutSessionRepo workoutSessionRepo;
    @Autowired
    private PerformedExerciseRepo performedExerciseRepo;


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

  /*  //treba popravit da ne obrise stare workoute nego ih samo prepravi
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
*/
    @Override
    public WorkoutPlanResponse updateWorkoutPlan(Long id, WorkoutPlanResponse workoutPlanResponse, MyUser user) {
        WorkoutPlan workoutPlan = workoutPlanRepo.findById(id)
                .orElseThrow(()-> new NonExistantEntityException("Workout plan with id "+id+" not found."));
        if(workoutPlan.getOwner()!=user) {
            throw new ForbiddenActionException("You have no permission to update this workout session.");
        }

        workoutPlan.setName(workoutPlanResponse.getName());
        workoutPlan.setDescription(workoutPlanResponse.getDescription());
        if (workoutPlanResponse.getImage() != null) {
            workoutPlan.setImage(workoutPlanResponse.getImage());
        }
        //svi workout id-evi otprije
        Set<Long> workoutIds = workoutPlan.getWorkouts().stream().map(Workout::getId).collect(Collectors.toSet());
        System.out.println("1.workout ids: "+workoutIds);

        Set<Long> newIds = workoutPlanResponse.getWorkouts().stream().map(WorkoutResponse::getId).collect(Collectors.toSet());
        for(Long newId : newIds) {
            if(newId!=null){
                Workout workout = workoutRepo.findById(newId).orElseThrow(()-> new NonExistantEntityException("Workout with id " + newId + " not found."));
            }
        }
        System.out.println("workout id set: "+workoutIds);
        for(WorkoutResponse workoutResponse : workoutPlanResponse.getWorkouts()){
            System.out.println("workout id: "+ workoutResponse.getId());
            if(workoutResponse.getId()!=null){
                //promijeni stari
                System.out.println("sada idem azurirati stari jer je id: "+ workoutPlanResponse.getId());
                Workout workout = workoutRepo.findById(workoutResponse.getId()).orElseThrow(()->new NonExistantEntityException("Workout with id "+workoutResponse.getId()+" not found."));
                workoutIds.remove(workoutResponse.getId());
                workout.setName(workoutResponse.getName());
                workout.setDescription(workoutResponse.getDescription());
                workout.setOrderNumber(workoutResponse.getOrder());
                Set<Long> plannedExerciseIds = workout.getPlannedExercises().stream().map(PlannedExercise::getId).collect(Collectors.toSet());
                for(PlannedExerciseResponse plannedExerciseResponse : workoutResponse.getExercises()) {
                    System.out.print("  planned exercise id: "+ plannedExerciseResponse.plannedExerciseId());
                    if(plannedExerciseResponse.plannedExerciseId()!=null){
                        //promijeni stari
                        PlannedExercise plannedExercise = plannedExerciseRepo.findById(plannedExerciseResponse.plannedExerciseId())
                                .orElseThrow(()->new NonExistantEntityException("Planned exercise with id "+plannedExerciseResponse.plannedExerciseId()+" not found."));
                        plannedExerciseIds.remove(plannedExerciseResponse.plannedExerciseId());

                        if(!plannedExercise.getExercise().getId().equals(plannedExerciseResponse.exerciseId())){
                            Exercise exercise = exerciseRepo.findById(plannedExerciseResponse.exerciseId())
                                    .orElseThrow(()->new NonExistantEntityException("Exercise with id "+plannedExerciseResponse.exerciseId()+" not found."));
                            plannedExercise.setExercise(exercise);
                        }
                        plannedExercise.setSets(plannedExerciseResponse.sets());
                        plannedExercise.setReps(plannedExerciseResponse.reps());
                        plannedExercise.setRpe(plannedExerciseResponse.rpe());
                        plannedExercise.setOrderNumber(plannedExerciseResponse.order());
                    }
                    else{
                        //napravi novi
                        Exercise exercise = exerciseRepo.findById(plannedExerciseResponse.exerciseId())
                                .orElseThrow(() -> new NonExistantEntityException("Exercise with id " + plannedExerciseResponse.exerciseId() +" not found."));
                        PlannedExercise newPlannedExercise = new PlannedExercise(plannedExerciseResponse.sets(), plannedExerciseResponse.reps(),
                                plannedExerciseResponse.rpe(), plannedExerciseResponse.order(), exercise, workout);

                        workout.addPlannedExercise(newPlannedExercise);
                    }
                    if(!plannedExerciseIds.isEmpty()) {
                        for(Long peId : plannedExerciseIds){
                            PlannedExercise plannedExercise= plannedExerciseRepo.findById(peId)
                                    .orElseThrow(()-> new NonExistantEntityException("Planned exercise with id "+id+" not found."));
                            if(performedExerciseRepo.countByPlannedExercise(plannedExercise)==0){
                                //smije se obrisati samo ako nije u performed_exercises
                                workout.getPlannedExercises().remove(plannedExercise);
                            }
                        }
                    }
                }
            }
            else{
                //napravi novi workout
                System.out.println("sada idem napraviti novi jer je id: "+ workoutPlanResponse.getId());
                Workout newWorkout = new Workout(workoutResponse.getName(),workoutResponse.getDescription(), workoutResponse.getOrder(),
                            workoutPlan);
                for(PlannedExerciseResponse plannedExerciseResponse : workoutResponse.getExercises()){
                    Exercise exercise = exerciseRepo.findById(plannedExerciseResponse.exerciseId())
                            .orElseThrow(() -> new NonExistantEntityException("Exercise with id " + plannedExerciseResponse.exerciseId() +" not found."));
                    PlannedExercise newPlannedExercise = new PlannedExercise(plannedExerciseResponse.sets(), plannedExerciseResponse.reps(),
                            plannedExerciseResponse.rpe(), plannedExerciseResponse.order(), exercise, newWorkout);

                    newWorkout.addPlannedExercise(newPlannedExercise);
                }
                workoutPlan.addWorkout(newWorkout);
            }
            System.out.println("2.workout ids: "+workoutIds);
            if(!workoutIds.isEmpty()){
                for(Long wId : workoutIds){
                    Workout workout = workoutRepo.findById(wId).orElseThrow(()-> new NonExistantEntityException("Workout with id "+id+" not found."));
                    if(workoutSessionRepo.countByWorkout(workout)==0){
                        workoutRepo.delete(workout);
                        workoutPlan.getWorkouts().remove(workout);

                    }
//                    else{
//                        throw new RemoveWorkoutException("You can't remove a workout from a workout plan if you used it.");
//                    }

                }
            }
        }
        workoutPlanRepo.save(workoutPlan);
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
            WorkoutResponse wp = new WorkoutResponse(workout.getId(), workout.getName(), workout.getDescription(), workout.getorderNumber());
            for(PlannedExercise exercise : workout.getPlannedExercises()){
                Exercise originalExercise = exerciseRepo.findById(exercise.getExercise().getId()).orElse(null);
                String exerciseName = "";
                if(originalExercise!=null) {exerciseName = originalExercise.getName(); }
                PlannedExerciseResponse per = new PlannedExerciseResponse(exercise.getId(), exercise.getExercise().getId(), exerciseName,
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
