package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.exception.ForbiddenActionException;
import GymFitnessTrackerApplication.exception.InvalidInputException;
import GymFitnessTrackerApplication.exception.NonExistantEntityException;
import GymFitnessTrackerApplication.model.dao.*;
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
import java.util.stream.Collectors;

@Service
public class WorkoutSessionServiceJpa implements WorkoutSessionService {

    @Autowired
    private WorkoutRepo workoutRepo;
    @Autowired
    private PlannedExerciseRepo plannedExerciseRepo;
    @Autowired
    private WorkoutSessionRepo workoutSessionRepo;
    @Autowired
    private PerformedExerciseRepo performedExerciseRepo;
    @Autowired
    private PerformedSetRepo performedSetRepo;

    @Override
    public WorkoutSessionResponse createWorkoutSession(WorkoutSessionForm workoutSessionForm, MyUser user) {
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
            PerformedExercises newPerformedExercise = getPerformedExercises(performedExerciseDTO, plannedExerciseId, newWorkoutSession);
            newWorkoutSession.addPerformedExercise(newPerformedExercise);
        }
        workoutSessionRepo.save(newWorkoutSession);
        return generateWorkoutSessionResponse(newWorkoutSession);
    }



    //mouzda napraviti da prima ExerciseResponse, a ne form jer mi trebaju id-evi svega
    @Override
    public WorkoutSessionResponse updateWorkoutSession(Long workoutSessionId, WorkoutSessionResponse workoutSessionResponse, MyUser user) {
        WorkoutSession workoutSession = workoutSessionRepo.findById(workoutSessionId)
                .orElseThrow(()-> new NonExistantEntityException("Workout session with id "+workoutSessionId+" not found."));
        if(workoutSession.getUser()!=user) {
            throw new ForbiddenActionException("You have no permission to update this workout session.");
        }

        //iz response sve uzimam
        //workoutSession.setDate(workoutSessionResponse.getDate());
        //userreview
        if(workoutSessionResponse.getUserReview()!=null ||
                !(workoutSession.getUserReview().getRating().equals(workoutSessionResponse.getUserReview().rating())
                        && workoutSession.getUserReview().getComment().equals(workoutSessionResponse.getUserReview().comment()))){
            workoutSession.getUserReview().setRating(workoutSessionResponse.getUserReview().rating());
            workoutSession.getUserReview().setComment(workoutSessionResponse.getUserReview().comment());
            //provjeri hoce li ovo trajno promijeniti???
        }
        //provjeriti jesu li svi id-evi iz workoutsession u workoutsessionresponsu -> nisu= obrisi ih
        Set<Long> wsIds = workoutSession.getPerformedExercises().stream().map(PerformedExercises::getId).collect(Collectors.toSet());
        for(PerformedExerciseDTO perfEDTO : workoutSessionResponse.getPerformedExercises()) {
            //razlikovati ako postoji, ako je id==null -> kreirati novi
            if(perfEDTO.getId()!=null){
                PerformedExercises performedExercises = performedExerciseRepo.findById(perfEDTO.getId())
                        .orElseThrow(()-> new NonExistantEntityException("Performed exercise with id "+perfEDTO.getId()+" not found."));
                wsIds.remove(performedExercises.getId());
                Set<Long> setIds = performedExercises.getPerformedSets().stream().map(PerformedSet::getId).collect(Collectors.toSet());
                for(PerformedSetDTO performedSetDTO : perfEDTO.getPerformedSets()) {
                    if(performedSetDTO.id()==null){
                        //kreiraj novi set i spoji na exercise
                        addSetToPerformedExercise(performedExercises, performedSetDTO);
                    }
                    else{
                        //promijeni postojeci
                        PerformedSet performedSet = performedSetRepo.findById(performedSetDTO.id())
                                .orElseThrow(()-> new NonExistantEntityException("Performed set with id "+performedSetDTO.id()+" not found."));
                        performedSet.setReps(performedSetDTO.reps());
                        performedSet.setWeight(performedSetDTO.weight());
                        performedSet.setRpe(performedSetDTO.rpe());
                        setIds.remove(performedSet.getId());
                    }
                }
                if(!setIds.isEmpty()) {
                    for(Long id : setIds) {
                        performedSetRepo.deleteById(id);
                        //valjda usput ukloni i vezu s performed exercise
                    }
                }
            }
            else{
                //kreairati i spojiti na workout session
                PlannedExercise plannedExerciseId = plannedExerciseRepo.findById(perfEDTO.getPlannedExerciseId()).orElse(null);
                Set<PerformedSetDTO> performedSetsDTO = perfEDTO.getPerformedSets();
                if(plannedExerciseId==null || performedSetsDTO==null) { throw new InvalidInputException("Invalid input for planned exercise."); }
                PerformedExercises newPerformedExercise = getPerformedExercises(perfEDTO, plannedExerciseId, workoutSession);
                workoutSession.addPerformedExercise(newPerformedExercise);
            }
        }
            //for each za svaki set
        for(Long id : wsIds){
            performedExerciseRepo.deleteById(id);
        }

        workoutSessionRepo.save(workoutSession);
        return generateWorkoutSessionResponse(workoutSession);
    }

    private static void addSetToPerformedExercise(PerformedExercises performedExercises, PerformedSetDTO performedSetDTO) {
        Integer reps = performedSetDTO.reps();
        Float weight = performedSetDTO.weight();
        Integer rpe = performedSetDTO.rpe();
        if(reps==null || weight==null || rpe==null) { throw new InvalidInputException("Invalid input for a performed set."); }
        PerformedSet newPerformedSet = new PerformedSet(performedExercises, reps,rpe,weight);
        performedExercises.addPerformedSet(newPerformedSet);
    }

    @Override
    public void deleteWorkoutSession(Long workoutSessionId, MyUser user) {
        WorkoutSession workoutSession = workoutSessionRepo.findById(workoutSessionId)
                .orElseThrow(()-> new NonExistantEntityException("Workout session with id "+workoutSessionId+" not found."));
        if(workoutSession.getUser()!=user) {
            throw new ForbiddenActionException("You have no permission to delete this workout session.");
        }
        workoutSessionRepo.delete(workoutSession);
    }

    @Override
    public WorkoutSessionResponse getWorkoutSession(Long workoutSessionId) {
        WorkoutSession workoutSession = workoutSessionRepo.findById(workoutSessionId)
                .orElseThrow(()-> new NonExistantEntityException("Workout session with id "+ workoutSessionId + "not found."));
        return generateWorkoutSessionResponse(workoutSession);
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
            PerformedExerciseDTO peDTO = new PerformedExerciseDTO(pe.getId(), pe.getPlannedExercise().getId());
            for(PerformedSet ps : pe.getPerformedSets()){
                PerformedSetDTO psDTO = new PerformedSetDTO(ps.getId(), ps.getReps(), ps.getRpe(), ps.getWeight());
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

    private static PerformedExercises getPerformedExercises(PerformedExerciseDTO performedExerciseDTO, PlannedExercise plannedExerciseId, WorkoutSession newWorkoutSession) {
        Set<PerformedSetDTO> performedSetsDTO = performedExerciseDTO.getPerformedSets();
        if(plannedExerciseId ==null || performedSetsDTO==null) { throw new InvalidInputException("Invalid input for planned exercise."); }
        PerformedExercises newPerformedExercise = new PerformedExercises(newWorkoutSession, plannedExerciseId);
        for(PerformedSetDTO performedSetDTO : performedSetsDTO) {
            addSetToPerformedExercise(newPerformedExercise, performedSetDTO);
        }
        return newPerformedExercise;
    }
}
