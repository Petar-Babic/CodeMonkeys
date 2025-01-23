package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.PerformedSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformedSetRepo extends JpaRepository<PerformedSet, Long> {
}
