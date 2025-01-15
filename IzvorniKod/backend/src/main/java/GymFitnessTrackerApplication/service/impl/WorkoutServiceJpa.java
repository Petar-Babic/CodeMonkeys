package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.model.dao.ExerciseRepo;
import GymFitnessTrackerApplication.model.dao.MyUserRepository;
import GymFitnessTrackerApplication.model.dao.WorkoutPlanRepo;
import GymFitnessTrackerApplication.model.domain.*;
import GymFitnessTrackerApplication.model.dto.PlannedExerciseDTO;
import GymFitnessTrackerApplication.model.dto.WorkoutDTO;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
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
import java.util.Date;
import java.util.List;

@Service
public class WorkoutServiceJpa implements WorkoutPlanService {
    @Autowired
    private WorkoutPlanRepo workoutPlanRepo;
    @Autowired
    private MyUserRepository myUserRepo;
    @Autowired
    private ExerciseRepo exerciseRepo;
    @Autowired
    private AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;


    @Override
    public List<WorkoutPlan> getUserWorkoutPlans(MyUser user) {
        return workoutPlanRepo.findByCreator(user);
    }

    @Override
    public List<WorkoutPlan> getPublicWorkoutPlans() {
        return workoutPlanRepo.findByOwnerIsNull();
    }

    @Override
    public String createNewWorkoutPlan(WorkoutPlanForm workoutPlanForm) {

        MyUser user = myUserRepo.findById(workoutPlanForm.createdByUserId())
                        .orElseThrow(() -> new UsernameNotFoundException("User doesn't exist."));
        WorkoutPlan newWorkoutPlan = new WorkoutPlan(workoutPlanForm.name(), workoutPlanForm.description(), user);
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
}
