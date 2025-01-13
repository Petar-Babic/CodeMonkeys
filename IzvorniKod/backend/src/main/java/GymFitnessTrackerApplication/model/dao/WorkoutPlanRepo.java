package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutPlanRepo extends JpaRepository<WorkoutPlan, Long> {
    List<WorkoutPlan> findByCreator(MyUser user);
    List<WorkoutPlan> findByOriginalWorkoutPlanIsNull();
}
