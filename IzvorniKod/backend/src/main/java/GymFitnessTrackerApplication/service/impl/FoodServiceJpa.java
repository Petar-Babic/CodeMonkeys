package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.exception.NoExistingFoodException;
import GymFitnessTrackerApplication.model.dao.FoodRepo;
import GymFitnessTrackerApplication.model.domain.Food;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.Role;
import GymFitnessTrackerApplication.model.domain.Unit;
import GymFitnessTrackerApplication.model.dto.forms.FoodForm;
import GymFitnessTrackerApplication.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

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
        if(!food.get().isApproved()) throw new NoExistingFoodException("Food not verified");
        return food.get();
    }
    @Override
    public Food getSpecificFoodAdmin(String id){
        Optional<Food> food = foodRepo.findById(Long.parseLong(id));
        if(food.isEmpty()) throw new NoExistingFoodException("No existing food with ID: " + id);
        return food.get();
    }

    public List<Food> foods(){
        return foodRepo.findAll();
    }

    public void deleteFood(String id){
        Long iD = Long.parseLong(id);
        if(foodRepo.findById(iD).isEmpty()) throw new NoExistingFoodException("No such food exists");
        foodRepo.deleteById(iD);
    }

    @Override
    public Food updateFood(String id,FoodForm form,MyUser user){
        Optional<Food> f = foodRepo.findById(Long.parseLong(id));
        if(f.isEmpty()) throw new NoExistingFoodException("No food item with ID : "+id);
        Food food = f.get();

        if(user.getRole().equals(Role.ADMIN)) {
            if (!Float.isNaN(form.getCalories()))
                food.setCalories(form.getCalories());
            if (!Float.isNaN(form.getCarbs()))
                food.setCarbs(form.getCarbs());
            if (!Float.isNaN(form.getFats()))
                food.setFat(form.getFats());
            if ((form.getName() != null))
                food.setName(form.getName());
            if (form.getDefaultNumber() != 0)
                food.setDefaultNumber(form.getDefaultNumber());
            if (!Float.isNaN(form.getProtein()))
                food.setProtein(form.getProtein());
            if (form.getUnit() != null)
                food.setUnit(form.getUnit());
            food.setApproved(true);
            return foodRepo.save(food);
        }else{
            Food food2 = new Food();
            food2.setApproved(false);

            if (!Float.isNaN(form.getCalories()))
                food2.setCalories(form.getCalories());
            else food2.setCalories(food.getCalories());

            if (!Float.isNaN(form.getCarbs()))
                food2.setCarbs(form.getCarbs());
            else food2.setCarbs(food.getCarbs());

            if (!Float.isNaN(form.getFats()))
                food2.setFat(form.getFats());
            else food2.setFat(food.getFat());

            if ((form.getName() != null))
                food2.setName(form.getName());
            else food2.setName(food.getName());

            if (form.getDefaultNumber() != 0)
                food2.setDefaultNumber(form.getDefaultNumber());
            else food2.setDefaultNumber(food.getDefaultNumber());

            if (!Float.isNaN(form.getProtein()))
                food2.setProtein(form.getProtein());
            else food2.setProtein(food.getProtein());

            if (form.getUnit() != null)
                food2.setUnit(form.getUnit());
            else food2.setUnit(food.getUnit());

            food2.setApproved(false);
            return foodRepo.save(food2);
        }
    }

    @Override
    public Food createFoodFromBarcode(MyUser user,String barcode){
        String url = "https://world.openfoodfacts.net/api/v2/product/";
        String secondPart = "?product_type=all&fields=product_name%2Cnutriments";
        String sb = url+barcode.replaceAll(" ","%20").replaceAll("/","%2F")+secondPart;
        System.out.println(sb);

       /* WebClient webClient = WebClient.create();

        // Parametriziramo tip podataka za vraćanje odgovora s WebClient
        List<Map<String, Object>> emails = webClient.get()
                .uri(url)
                .headers(headers -> headers.setBearerAuth(accessToken.getTokenValue()))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {
                })
                .block();*/
        return null;

    }
}
