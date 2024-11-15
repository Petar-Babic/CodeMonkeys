package GymFitnessTrackerApplication.dao;

import GymFitnessTrackerApplication.domain.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyMeasurementRepo extends JpaRepository<Measurement,Long> {
    //
}
