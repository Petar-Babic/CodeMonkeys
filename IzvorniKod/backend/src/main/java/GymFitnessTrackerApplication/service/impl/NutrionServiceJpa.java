package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.model.dao.MyNutrionPlanRepo;
import GymFitnessTrackerApplication.model.dao.MyUserRepository;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.forms.NutrionPlanForm;
import GymFitnessTrackerApplication.service.NutrionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class NutrionServiceJpa implements NutrionService {

    @Autowired
    private MyNutrionPlanRepo nutrionPlanRepo;

    @Autowired
    private MyUserRepository myUserRepository;
    public NutrionPlan createNutrionPlan(MyUser user,@RequestBody NutrionPlanForm form){
        NutrionPlan nutrionPlan = new NutrionPlan(user,form);
        return nutrionPlanRepo.save(nutrionPlan);
    }

    @Transactional
    public void updateNutrionPlan(MyUser user,@RequestBody NutrionPlanForm form){
        nutrionPlanRepo.findByMyUser(user).ifPresent(
                nutrionPlan -> {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                    nutrionPlan.setCalories(form.getCalories());
                    nutrionPlan.setCarbs(form.getCarbs());
                    nutrionPlan.setFat(form.getFat());
                    nutrionPlan.setProtein(form.getProtein());
                    nutrionPlan.setUpdatedAt(ZonedDateTime.now());
                    nutrionPlan.setEndDate(LocalDate.parse(form.getEndDate(),formatter));
                    nutrionPlan.setStartDate(LocalDate.parse(form.getStartDate(),formatter));
                    nutrionPlanRepo.save(nutrionPlan);
                }
        );
    }
}
