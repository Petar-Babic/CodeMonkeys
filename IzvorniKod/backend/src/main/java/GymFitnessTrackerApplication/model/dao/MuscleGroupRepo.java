package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.MuscleGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MuscleGroupRepo extends JpaRepository<MuscleGroup, Long> {
    @Override
    Optional<MuscleGroup> findById(Long id);
}
