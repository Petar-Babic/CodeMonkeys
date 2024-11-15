package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.dao.MyStatsGoalsRepo;
import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.domain.StatsGoals;
import GymFitnessTrackerApplication.forms.BodyGoalsForm;
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
