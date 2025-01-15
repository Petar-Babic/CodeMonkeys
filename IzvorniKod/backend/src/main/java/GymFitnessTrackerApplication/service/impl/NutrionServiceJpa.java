package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.exception.NoNutrionPlanException;
import GymFitnessTrackerApplication.model.dao.MyNutrionPlanRepo;
import GymFitnessTrackerApplication.model.dao.MyUserRepository;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.dto.forms.BodyGoalsForm;
import GymFitnessTrackerApplication.model.dto.forms.NutrionPlanForm;
import GymFitnessTrackerApplication.service.NutrionService;
import jakarta.transaction.Transactional;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class NutrionServiceJpa implements NutrionService {

    @Autowired
    private MyNutrionPlanRepo nutrionPlanRepo;

    @Autowired
    private MyUserRepository myUserRepository;

    public NutrionPlan createNutrionPlan(MyUser user, @RequestBody NutrionPlanForm form) {
        NutrionPlan nutrionPlan = new NutrionPlan(user, form);
        nutrionPlan.setCreatedBy(user.getId().toString());
        removeCurrentPlan(user);
        nutrionPlan.setCurrent(true);
        return nutrionPlanRepo.save(nutrionPlan);
    }

    // za trenera kao user on sam, createdFor se nade iz id
    @Override
    public NutrionPlan createNutrionPlanTrainer(MyUser user, @RequestBody NutrionPlanForm form,String createdFor) {
        MyUser createdForUser = myUserRepository.findById(Long.parseLong(createdFor)).get();
        NutrionPlan nutrionPlan = new NutrionPlan(createdForUser, form);
        nutrionPlan.setCreatedBy(user.getId().toString());
        removeCurrentPlan(createdForUser);
        nutrionPlan.setCurrent(true);
        return nutrionPlanRepo.save(nutrionPlan);
    }

    @Transactional
    public void updateNutrionPlan(@RequestBody NutrionPlanForm form,NutrionPlan plan) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        plan.setCalories(form.getCalories());
        plan.setCarbs(form.getCarbs());
        plan.setFat(form.getFat());
        plan.setProtein(form.getProtein());
        plan.setUpdatedAt(ZonedDateTime.now());
        plan.setEndDate(LocalDate.parse(form.getEndDate(), formatter));
        plan.setStartDate(LocalDate.parse(form.getStartDate(), formatter));
        nutrionPlanRepo.save(plan);
    }


    @Transactional
    @Override
    public void createNutrionFromForm(MyUser user, @RequestBody BodyGoalsForm form) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        NutrionPlan nutrionPlan = new NutrionPlan();
        nutrionPlan.setCreatedAt(ZonedDateTime.now());
        nutrionPlan.setUpdatedAt(ZonedDateTime.now());
        nutrionPlan.setMyUser(user);
        nutrionPlan.setCreatedBy(user.getId().toString());
        nutrionPlan.setStartDate(form.getStartDate());
        nutrionPlan.setEndDate(form.getEndDate());
        nutrionPlan.setCalories(form.getCalories());
        nutrionPlan.setFat(form.getFat());
        nutrionPlan.setCarbs(form.getCarbs());
        nutrionPlan.setProtein(form.getProtein());
        removeCurrentPlan(user);
        nutrionPlan.setCurrent(true);
        nutrionPlanRepo.save(nutrionPlan);

    }

    @Override
    public NutrionPlan getMyPlan(MyUser user) {
        List<NutrionPlan> nutrionPlans = nutrionPlanRepo.findAllByMyUser(user);
        if (nutrionPlans.isEmpty()) {
            throw new NoNutrionPlanException("No nutrition plan to edit");
        }
        NutrionPlan pl;
        pl = nutrionPlans.stream().filter( plan -> plan.isCurrent()).findFirst().get();
        return pl;
    }

    @Override
    public NutrionPlan getPlanFromId(String id){
        Optional<NutrionPlan> np = nutrionPlanRepo.findById(Long.parseLong(id));
        if(np.isEmpty())
            throw new NoNutrionPlanException("No id under this ID");
        return np.get();
    }


        @Override
        public boolean removeCurrentPlan (MyUser user){
            user.getNutrionPlans().stream().forEach(
                    nutrionPlan -> {
                        nutrionPlan.setCurrent(false);
                        nutrionPlanRepo.save(nutrionPlan);
                    }
            );

            return true;

        }


}