package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.model.dao.MyStatsGoalsRepo;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.StatsGoals;
import GymFitnessTrackerApplication.model.forms.BodyGoalsForm;
import GymFitnessTrackerApplication.service.MyGoalsStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
class MyGoalsStatsServiceJpa implements MyGoalsStatsService {

    @Autowired
    private MyStatsGoalsRepo statsRepo;

    public List<StatsGoals> listAll(){
        return statsRepo.findAll();
    }

    @Override
    public StatsGoals createGoals(MyUser measurementId, BodyGoalsForm bd) {
        StatsGoals stats = new StatsGoals(measurementId,bd);
        stats.setCreatedAt(ZonedDateTime.now());
        stats.setUpdatedAt(ZonedDateTime.now());

        return stats;
    }


}
