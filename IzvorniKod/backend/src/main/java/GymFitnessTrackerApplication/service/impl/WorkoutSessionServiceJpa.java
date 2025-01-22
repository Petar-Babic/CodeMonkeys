package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.exception.InvalidInputException;
import GymFitnessTrackerApplication.model.dao.PlannedExerciseRepo;
import GymFitnessTrackerApplication.model.dao.WorkoutRepo;
import GymFitnessTrackerApplication.model.dao.WorkoutSessionRepo;
import GymFitnessTrackerApplication.model.domain.*;
import GymFitnessTrackerApplication.model.dto.forms.WorkoutSessionForm;
import GymFitnessTrackerApplication.model.dto.response.WorkoutSessionResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.PerformedExerciseDTO;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.PerformedSetDTO;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.ReviewDTO;
import GymFitnessTrackerApplication.service.WorkoutSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class WorkoutSessionServiceJpa implements WorkoutSessionService {

    @Autowired
    private WorkoutRepo workoutRepo;
    @Autowired
    private PlannedExerciseRepo plannedExerciseRepo;
    @Autowired
    private WorkoutSessionRepo workoutSessionRepo;

    @Override
    public void createWorkoutSession(WorkoutSessionForm workoutSessionForm, MyUser user) {
        Workout workout = workoutRepo.findById(workoutSessionForm.workoutId()).orElse(null);
        Date date = workoutSessionForm.date();
        ReviewDTO reviewDTO = workoutSessionForm.userReview();
        Set<PerformedExerciseDTO> performedExercises = workoutSessionForm.performedExercises();

        if(workout==null || date==null || reviewDTO==null || performedExercises==null) {
            throw new InvalidInputException("Invalid input for workout.");
        }

        Review userReview = new Review(reviewDTO);
        WorkoutSession newWorkoutSession = new WorkoutSession(date, user, userReview, workout);
        for(PerformedExerciseDTO performedExerciseDTO : performedExercises) {
            PlannedExercise plannedExerciseId = plannedExerciseRepo.findById(performedExerciseDTO.getPlannedExerciseId()).orElse(null);
            Set<PerformedSetDTO> performedSetsDTO = performedExerciseDTO.getPerformedSets();
            if(plannedExerciseId==null || performedSetsDTO==null) { throw new InvalidInputException("Invalid input for planned exercise."); }
            PerformedExercises newPerformedExercise = new PerformedExercises(newWorkoutSession, plannedExerciseId);
            for(PerformedSetDTO performedSetDTO : performedSetsDTO) {
                Integer reps = performedSetDTO.reps();
                Float weight = performedSetDTO.weight();
                Integer rpe = performedSetDTO.rpe();
                if(reps==null || weight==null || rpe==null) { throw new InvalidInputException("Invalid input for a performed set."); }
                PerformedSet newPerformedSet = new PerformedSet(newPerformedExercise, reps,rpe,weight);
                newPerformedExercise.addPerformedSet(newPerformedSet);
            }
            newWorkoutSession.addPerformedExercise(newPerformedExercise);
        }
        workoutSessionRepo.save(newWorkoutSession);
    }

    @Override
    public void updateWorkoutSession(WorkoutSessionForm workoutSessionForm, MyUser user) {

    }

    @Override
    public void deleteWorkoutSession(Long workoutSessionId, MyUser user) {

    }

    @Override
    public Set<WorkoutSessionResponse> getWorkoutSessionsBetweenDates(MyUser user, Date starDate, Date endDate) {
        Set<WorkoutSession> workoutSessions = workoutSessionRepo.findByUserAndDateInterval(user, starDate, endDate);
        return generateSetWorkoutSessionResponse(workoutSessions);
    }

    @Override
    public Set<WorkoutSessionResponse> getWorkoutSessionsForUser(MyUser user) {
        Set<WorkoutSession> workoutSessions = workoutSessionRepo.findByUser(user);
        return generateSetWorkoutSessionResponse(workoutSessions);
    }


    private WorkoutSessionResponse generateWorkoutSessionResponse(WorkoutSession workoutSession){
        ReviewDTO userReview = new ReviewDTO(workoutSession.getUserReview().getRating(),workoutSession.getUserReview().getComment());
        ReviewDTO trainerReview=null;
        if(workoutSession.getTrainerReview()!=null){
            trainerReview = new ReviewDTO(workoutSession.getTrainerReview().getRating(),workoutSession.getTrainerReview().getComment());
        }
        WorkoutSessionResponse wsr = new WorkoutSessionResponse(workoutSession.getId(), workoutSession.getDate(), userReview, trainerReview);
        for(PerformedExercises pe : workoutSession.getPerformedExercises()){
            PerformedExerciseDTO peDTO = new PerformedExerciseDTO(pe.getPlannedExercise().getId());
            for(PerformedSet ps : pe.getPerformedSets()){
                PerformedSetDTO psDTO = new PerformedSetDTO(ps.getReps(), ps.getWeight(), ps.getRpe());
                peDTO.addPerformedSet(psDTO);
            }
            wsr.addPerformedExercise(peDTO);
        }
        return wsr;
    }

    private Set<WorkoutSessionResponse> generateSetWorkoutSessionResponse(Set<WorkoutSession> workoutSessions){
        Set<WorkoutSessionResponse> response = new HashSet<>();
        for(WorkoutSession workoutSession : workoutSessions){
            response.add(generateWorkoutSessionResponse(workoutSession));
        }
        return response;
    }
}
