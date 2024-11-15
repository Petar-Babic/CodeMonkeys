package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.domain.Measurement;
import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.forms.BodyMeasurementForm;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface MyMeasurementsService {
    List<Measurement> listAll();
    Measurement createMeasurement(MyUser measurementId, @RequestBody BodyMeasurementForm bd);

}
