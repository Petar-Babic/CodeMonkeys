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
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
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
    public Food createFoodFromBarcode(MyUser user, String barcode) {
        String baseUrl = "https://world.openfoodfacts.net/api/v2/product/";
        String apiUrl = baseUrl + barcode.replaceAll("\\([^)]*\\)", ""); // Remove any extra characters

        WebClient webClient = WebClient.builder().build();

        try {
            Map<String, Object> response = webClient.get()
                    .uri(apiUrl)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                    .block();
            if (response == null || !response.containsKey("product")) {
                throw new NoExistingFoodException("No such item exists in the Open Food Facts database.");
            }

            // Extract product data
            LinkedHashMap<String, Object> productData = (LinkedHashMap<String, Object>) response.get("product");
            String name = (String) productData.getOrDefault("product_name", "Unknown Product");
            String quantity = (String) productData.getOrDefault("product_quantity", null);
            String quantity2 = (String) productData.getOrDefault("quantity", null);
            String unit = (String) productData.getOrDefault("product_quantity_unit",null);
            LinkedHashMap<String, Object> nutriments = (LinkedHashMap<String, Object>) productData.get("nutriments");
            Unit unit1 = determineUnit(unit,quantity2);

            float calories = nutriments != null ? ((Number) nutriments.getOrDefault("energy-kcal_100g", 0)).floatValue() : 0;
            float protein = nutriments != null ? ((Number) nutriments.getOrDefault("proteins_100g", 0)).floatValue() : 0;
            float fat = nutriments != null ? ((Number) nutriments.getOrDefault("fat_100g", 0)).floatValue() : 0;
            float carbs = nutriments != null ? ((Number) nutriments.getOrDefault("carbohydrates_100g", 0)).floatValue() : 0;

            if(quantity!=null){
                if(calories>0)
                    calories = calories*Float.valueOf(quantity)/100;
                if(protein>0)
                    protein = protein*Float.valueOf(quantity)/100;
                if(fat>0)
                    fat = fat*Float.valueOf(quantity)/100;
                if(carbs>0)
                    carbs = carbs*Float.valueOf(quantity)/100;
            }


            Food food = new Food();
            food.setName(name);
            food.setCalories(calories);
            food.setProtein(protein);
            food.setFat(fat);
            food.setCarbs(carbs);
            food.setUnit(unit1);
            try{
                Float def = Float.valueOf(quantity);
                food.setDefaultNumber(def);
            }catch(Exception e){
                food.setDefaultNumber(1);
            }
            food.setApproved(user.getRole().equals(Role.ADMIN)); // Automatically approve if user is admin

            // Save the food object to the database
            return foodRepo.save(food);

        } catch (Exception e) {
            System.err.println("Error fetching food details: " + e.getMessage());
            e.printStackTrace();
            throw new NoExistingFoodException("Failed to create food from barcode. Please try again.");
        }
    }

    Unit determineUnit(String unit,String quantity2){
        if(unit == null && quantity2==null) return null;
        else {
            if(unit == null) {
                if ( quantity2.contains(" g")) return Unit.g;
                else if (quantity2.contains(" ml")) return Unit.ml;
                else return Unit.pcs;
            }else {
                if (unit.equalsIgnoreCase("g") || quantity2.contains(" g")) return Unit.g;
                else if (unit.equalsIgnoreCase("ml") || quantity2.contains(" ml")) return Unit.ml;
                else return Unit.pcs;
            }
        }
    }



}
