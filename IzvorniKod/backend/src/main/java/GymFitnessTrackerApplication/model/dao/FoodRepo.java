package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepo extends JpaRepository<Food,Long> {
}
