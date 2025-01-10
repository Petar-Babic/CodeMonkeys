package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.StatsGoals;
import GymFitnessTrackerApplication.model.forms.BodyGoalsForm;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface MyGoalsStatsService {
    List<StatsGoals> listAll();
    StatsGoals createGoals(MyUser measurementId, @RequestBody BodyGoalsForm bd);

    @Transactional
    void updateGoals(MyUser measurementId,@RequestBody BodyGoalsForm bd);

}
