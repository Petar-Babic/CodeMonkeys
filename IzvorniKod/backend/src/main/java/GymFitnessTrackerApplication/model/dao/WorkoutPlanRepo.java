package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface WorkoutPlanRepo extends JpaRepository<WorkoutPlan, Long> {
    Set<WorkoutPlan> findAllByCreator(MyUser user);
    Set<WorkoutPlan> findAllByOwner(MyUser user);
    Set<WorkoutPlan> findAllByOwnerIsNull();            //public workout plans
    WorkoutPlan findByOwner(MyUser user);
    Optional<WorkoutPlan> findById(Long id);
    @Query("SELECT wp FROM WorkoutPlan wp WHERE wp.owner=:user AND wp.isActive=true")
    WorkoutPlan findActiveWorkoutPlanForUser(@Param("user") MyUser user);
}
