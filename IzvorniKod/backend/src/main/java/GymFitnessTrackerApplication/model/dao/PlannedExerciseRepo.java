package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.PlannedExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlannedExerciseRepo extends JpaRepository<PlannedExercise, Long> {
    Optional<PlannedExercise> findPlannedExerciseById(Long id);
}
