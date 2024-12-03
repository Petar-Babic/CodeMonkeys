package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.StatsGoals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MyStatsGoalsRepo extends JpaRepository<StatsGoals, Long> {
    //
}
