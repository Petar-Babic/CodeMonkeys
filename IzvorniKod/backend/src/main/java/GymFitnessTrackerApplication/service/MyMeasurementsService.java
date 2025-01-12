package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.Measurement;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.forms.BodyMeasurementForm;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface MyMeasurementsService {
    List<Measurement> listAll();
    Measurement createMeasurement(MyUser measurementId, @RequestBody BodyMeasurementForm bd);



}
