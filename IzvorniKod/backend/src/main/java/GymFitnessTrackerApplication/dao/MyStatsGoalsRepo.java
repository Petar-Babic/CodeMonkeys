package GymFitnessTrackerApplication.dao;

import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.domain.StatsGoals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MyStatsGoalsRepo extends JpaRepository<StatsGoals, Long> {
    //
}
