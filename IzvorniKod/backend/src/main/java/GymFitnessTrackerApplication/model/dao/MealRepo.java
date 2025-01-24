package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.Meal;
import GymFitnessTrackerApplication.model.domain.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealRepo extends JpaRepository<Meal,Long> {

    List<Meal> findAllByUser(MyUser user);
}
