package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyMeasurementRepo extends JpaRepository<Measurement,Long> {
    //
}
