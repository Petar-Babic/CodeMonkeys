package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.Goals;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MyNutrionPlanRepo  extends JpaRepository<NutrionPlan,Long> {

    Optional<NutrionPlan> findByMyUser(MyUser user);
}
