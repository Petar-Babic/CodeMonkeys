package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.dto.forms.NutrionPlanForm;
import org.springframework.web.bind.annotation.RequestBody;

public interface NutrionService {


    NutrionPlan createNutrionPlan(MyUser user, @RequestBody NutrionPlanForm form);


    void updateNutrionPlan(MyUser user,@RequestBody NutrionPlanForm form);

}
