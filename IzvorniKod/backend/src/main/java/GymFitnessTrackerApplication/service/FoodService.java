package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.Food;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.FoodForm;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FoodService {
    Food createFoodFromForm(MyUser creator, FoodForm form);

    Food getSpecificFood(String id);

    Food getSpecificFoodAdmin(String id);

    List<Food> foods();

    Food updateFood(String id,FoodForm form,MyUser user);

    Food createFoodFromBarcode(MyUser user,String barcode);

    void deleteFood(String id);
}
