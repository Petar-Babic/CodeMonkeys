package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.Goals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MyStatsGoalsRepo extends JpaRepository<Goals, Long> {
    //
    Optional<Goals> findById(Long id);


}