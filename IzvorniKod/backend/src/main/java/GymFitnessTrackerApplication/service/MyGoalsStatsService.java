package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.domain.Measurement;
import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.domain.StatsGoals;
import GymFitnessTrackerApplication.forms.BodyGoalsForm;
import GymFitnessTrackerApplication.forms.BodyMeasurementForm;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface MyGoalsStatsService {
    List<StatsGoals> listAll();
    StatsGoals createGoals(MyUser measurementId, @RequestBody BodyGoalsForm bd);
}
