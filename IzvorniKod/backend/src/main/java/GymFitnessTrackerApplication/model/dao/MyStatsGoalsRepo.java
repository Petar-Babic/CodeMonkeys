package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.StatsGoals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MyStatsGoalsRepo extends JpaRepository<StatsGoals, Long> {
    //
    Optional<StatsGoals> findById(Long id);


}
