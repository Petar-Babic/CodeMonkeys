package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.MuscleGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MuscleGroupRepo extends JpaRepository<MuscleGroup, Long> {
}
