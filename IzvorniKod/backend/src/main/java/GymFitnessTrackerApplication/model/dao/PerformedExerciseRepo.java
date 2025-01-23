package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.PerformedExercises;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformedExerciseRepo extends JpaRepository<PerformedExercises, Long> {
}
