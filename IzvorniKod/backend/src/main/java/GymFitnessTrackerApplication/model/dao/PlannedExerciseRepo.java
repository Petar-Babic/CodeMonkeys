package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.Exercise;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.PlannedExercise;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.PerfExerciseRepoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface PlannedExerciseRepo extends JpaRepository<PlannedExercise, Long> {
    @Query(value = "SELECT new GymFitnessTrackerApplication.model.dto.workoutDTOs.PerfExerciseRepoDTO(perfe,ws.date)" +
            " FROM PlannedExercise ple, PerformedExercises perfe" +
            ", WorkoutSession ws WHERE perfe.plannedExercise=ple AND perfe.workoutSession=ws AND ple.exercise=:exercise AND ws.user=:user")
    List<PerfExerciseRepoDTO> findPerformedExerciseHistory(@Param("user") MyUser user, @Param("exercise") Exercise exercise);
}
