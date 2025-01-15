package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.dto.response.BodyMeasurementsResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;


@Repository
public interface MyNutrionPlanRepo  extends JpaRepository<NutrionPlan,Long> {

    Optional<NutrionPlan> findByMyUser(MyUser user);

    List<NutrionPlan> findAllByMyUser(MyUser user);

}
