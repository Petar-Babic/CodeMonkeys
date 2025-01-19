package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.Measurement;
import GymFitnessTrackerApplication.model.domain.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MyMeasurementRepo extends JpaRepository<Measurement,Long> {
    //


    Optional<Measurement> findByMyuser(MyUser user);

    List<Measurement> findAllByMyuser(MyUser user);

}
