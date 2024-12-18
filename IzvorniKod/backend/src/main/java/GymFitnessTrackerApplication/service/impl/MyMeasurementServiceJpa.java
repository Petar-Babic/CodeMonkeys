package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.dao.MyMeasurementRepo;
import GymFitnessTrackerApplication.domain.Measurement;
import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.forms.BodyMeasurementForm;
import GymFitnessTrackerApplication.service.MyMeasurementsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.StreamingHttpOutputMessage;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@Service
public class MyMeasurementServiceJpa implements MyMeasurementsService {

    @Autowired
    private MyMeasurementRepo measurementRepo;
    @Override
    public List<Measurement> listAll() {
        return measurementRepo.findAll();
    }

    @Override
    public Measurement createMeasurement(MyUser id, @RequestBody BodyMeasurementForm bodyMeasurementForm) {
        Measurement m = new Measurement(id,bodyMeasurementForm);
        m.setUpdated_at(bodyMeasurementForm.getDate());
        m.setCreated_at(bodyMeasurementForm.getDate());

        return measurementRepo.save(m);
    }
}
