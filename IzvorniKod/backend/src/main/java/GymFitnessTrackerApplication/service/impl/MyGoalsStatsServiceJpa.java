package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.model.dao.MyStatsGoalsRepo;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.Goals;
import GymFitnessTrackerApplication.model.dto.forms.BodyGoalsForm;
import GymFitnessTrackerApplication.service.MyGoalsStatsService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
class MyGoalsStatsServiceJpa implements MyGoalsStatsService {

    @Autowired
    private MyStatsGoalsRepo statsRepo;

    public List<Goals> listAll(){
        return statsRepo.findAll();
    }

    @Override
    public Goals createGoals(MyUser measurementId, BodyGoalsForm bd) {
        Goals stats = new Goals(measurementId,bd);
        stats.setCreatedAt(ZonedDateTime.now());
        stats.setUpdatedAt(ZonedDateTime.now());

        return stats;
    }

    @Override
    @Transactional
    public void updateGoals(MyUser measurementsId,BodyGoalsForm bd){
        statsRepo.findById(measurementsId.getId()).ifPresent(
                stats -> {
                    stats.setUpdatedAt(ZonedDateTime.now());
                    stats.setTimelineWeeks(bd.getTimelineWeeks());
                    stats.setCalories(bd.getCalories());
                    stats.setCarbs(bd.getCarbs());
                    stats.setFat(bd.getFat());
                    stats.setProtein(bd.getProtein());
                    stats.setGender(bd.getGender());

                    statsRepo.save(stats);
                }
        );
    }


}