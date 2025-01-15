package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.Measurement;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.dto.forms.BodyGoalsForm;
import GymFitnessTrackerApplication.model.dto.forms.BodyMeasurementForm;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface MyMeasurementsService {
    List<Measurement> listAll();
    Measurement createMeasurement(MyUser measurementId, @RequestBody BodyMeasurementForm bd,String deciding);

    List<Measurement> getMyMeasurements(MyUser user);

    List<Measurement> getMyGoalMeasurements(MyUser user);

    @Transactional
    void createGoalMeasurementFromStats(MyUser user, @RequestBody BodyGoalsForm form);
}