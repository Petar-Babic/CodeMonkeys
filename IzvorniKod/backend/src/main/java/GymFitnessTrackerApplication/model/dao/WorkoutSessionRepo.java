package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.Workout;
import GymFitnessTrackerApplication.model.domain.WorkoutSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Set;

@Repository
public interface WorkoutSessionRepo extends JpaRepository<WorkoutSession, Long> {
    Set<WorkoutSession> findByUser(MyUser user);
    Set<WorkoutSession> findByWorkout(Workout workout);
    @Query("SELECT distinct ws FROM WorkoutSession ws WHERE ws.user=:user AND ws.date>=:startDate AND ws.date<=:endDate")
    Set<WorkoutSession> findByUserAndDateInterval(MyUser user, Date startDate, Date endDate);
}
