package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.PerformedExercises;
import GymFitnessTrackerApplication.model.domain.PlannedExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformedExerciseRepo extends JpaRepository<PerformedExercises, Long> {
    int countByPlannedExercise(PlannedExercise plannedExercise);
}
