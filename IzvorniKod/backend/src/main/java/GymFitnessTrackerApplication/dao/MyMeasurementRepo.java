package GymFitnessTrackerApplication.dao;

import GymFitnessTrackerApplication.domain.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

@Repository
public interface MyMeasurementRepo extends JpaRepository<Measurement,Long> {
    //
}
