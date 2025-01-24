package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.FoodMeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodMealRepo extends JpaRepository<FoodMeal,Long> {
}
