package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.dto.forms.BodyGoalsForm;
import GymFitnessTrackerApplication.model.dto.forms.NutrionPlanForm;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface NutrionService {


    NutrionPlan createNutrionPlan(MyUser user, @RequestBody NutrionPlanForm form);


    NutrionPlan createNutrionPlanTrainer(MyUser user, @RequestBody NutrionPlanForm form,Long createdFor);

    NutrionPlan createNutrionPlanTrainer(MyUser user, @RequestBody BodyGoalsForm form,Long createdFor);

    void updateNutrionPlan(@RequestBody NutrionPlanForm form,NutrionPlan plan);

    NutrionPlan getMyPlan(MyUser user);

    NutrionPlan getPlanFromId(String id);

    void createNutrionFromForm(MyUser user, @RequestBody BodyGoalsForm form);

    boolean removeCurrentPlan(MyUser user);
}
