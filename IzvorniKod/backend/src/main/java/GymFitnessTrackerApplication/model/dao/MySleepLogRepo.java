package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.SleepLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MySleepLogRepo extends JpaRepository<SleepLog,Long> {

    List<SleepLog> findAllByUser(MyUser user);
}
