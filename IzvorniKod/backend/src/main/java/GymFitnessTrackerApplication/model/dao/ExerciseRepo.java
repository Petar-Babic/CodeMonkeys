package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.Exercise;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRepo extends JpaRepository<Exercise, Long> {
    Optional<Exercise> findById(Long id);
    List<Exercise> findByIsApprovedFalse();
    List<Exercise> findByIsApprovedTrue();
    List<Exercise> findByCreatedByUser(MyUser user);

}
