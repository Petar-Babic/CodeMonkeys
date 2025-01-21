package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.exception.NoExistingFoodException;
import GymFitnessTrackerApplication.model.dao.FoodRepo;
import GymFitnessTrackerApplication.model.domain.Food;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.Role;
import GymFitnessTrackerApplication.model.dto.forms.FoodForm;
import GymFitnessTrackerApplication.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodServiceJpa implements FoodService{

    @Autowired
    private FoodRepo foodRepo;
    @Override
    public Food createFoodFromForm(MyUser creator, FoodForm form){
        if(creator.getRole().equals(Role.ADMIN))
            form.setApproved(true);
        else
            form.setApproved(false);
        Food f =  new Food(form);
        return foodRepo.save(f);
    }

    @Override
    public Food getSpecificFood(String id){
        Optional<Food> food = foodRepo.findById(Long.parseLong(id));
        if(food.isEmpty()) throw new NoExistingFoodException("No existing food with ID: " + id);
        return food.get();
    }

    public List<Food> foods(){
        return foodRepo.findAll();
    }
}