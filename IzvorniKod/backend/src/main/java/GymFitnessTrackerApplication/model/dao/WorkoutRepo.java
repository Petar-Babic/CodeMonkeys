package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutRepo extends JpaRepository<Workout, Long> {
}
