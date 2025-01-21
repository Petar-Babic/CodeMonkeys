package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.exception.AdminRestrictedException;
import GymFitnessTrackerApplication.exception.NoExistingFoodException;
import GymFitnessTrackerApplication.exception.NonExistantSleepLog;
import GymFitnessTrackerApplication.model.dao.FoodMealRepo;
import GymFitnessTrackerApplication.model.dao.MealRepo;
import GymFitnessTrackerApplication.model.dao.MyUserRepository;
import GymFitnessTrackerApplication.model.domain.FoodMeal;
import GymFitnessTrackerApplication.model.domain.Meal;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.Role;
import GymFitnessTrackerApplication.model.dto.forms.MealForm;
import GymFitnessTrackerApplication.service.MealService;
import GymFitnessTrackerApplication.service.MyUserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MealServiceJpa implements MealService {

    @Autowired
    private MealRepo mealRepo;


    @Autowired
    private MyUserRepository userRepository;

    @Transactional
    @Override
    public Meal createMeal(MyUser user, MealForm form){
        Optional<MyUser> createdFor = userRepository.findById(Long.parseLong(form.getUserId()));
        if(createdFor.isEmpty()) throw new UsernameNotFoundException("User doesnt exist");
        Meal m = new Meal(user,form,createdFor.get());
        return mealRepo.save(m);
    }



    @Override
    @Transactional
    public void setFoodMeals(Meal meal, List<FoodMeal> foodMeals){
        meal.setMealFoods(foodMeals);
        mealRepo.save(meal);

    }

    public Meal createMealUser(MyUser user,MealForm form){
        Optional<MyUser> createdFor = userRepository.findById(Long.parseLong(form.getUserId()));
        if(!user.getId().equals(createdFor.get().getId()))
            throw new AdminRestrictedException("User is not a trainer");
        Meal m = new Meal(user,form,user);
        m.setSuggestion(false);
        // nadi suggested meal
        /*List<Meal> suggestedMeals = mealRepo.findAllByUser(user);
        if(suggestedMeals.isEmpty())
            m.setSuggestedId(null);
        else{
            StringBuilder sb = new StringBuilder();
            Set<String> idApperead = new HashSet<>();
            suggestedMeals.forEach(
                    meal -> {
                        if ( meal.isSuggestion() && meal.getSuggestedId().equals("N/A") && idApperead.add(meal.getId().toString())) {
                            sb.append(meal.getId().toString() + ",");
                        }
                    }
            );
            if(sb.length() <= 0)
                m.setSuggestedId("N/A");
            else
                m.setSuggestedId(sb.toString().substring(0,sb.lastIndexOf(",")));*/
        m.setSuggestedId(form.getSuggestedId());
        return mealRepo.save(m);
    }

    public Meal createMealAdmin(MyUser user,MealForm form){
        Optional<MyUser> createdFor = userRepository.findById(Long.parseLong(form.getUserId()));
        Meal m = new Meal(user,form,createdFor.get());
        m.setSuggestion(true);
        m.setSuggestedId(null);
        return mealRepo.save(m);
    }

    public Meal getMeal(MyUser u,String id){
        Optional<Meal> meal = mealRepo.findById(Long.parseLong(id));
        if(meal.isEmpty()) throw new NoExistingFoodException("No such meal exists");
        Meal m = meal.get();
        if(!m.getUser().toString().equals(u.getId().toString())) {
            if(u.getRole().equals(Role.USER)) throw new AdminRestrictedException("User doesnt have authority");
        }
        return m;
    }

    public List<Meal> getAllMeals(MyUser u){
        if(u.getRole().equals(Role.USER)) throw new AdminRestrictedException("User doesnt have authority");
        return mealRepo.findAll();
    }

    public List<Meal> getMeals(MyUser u){
        return mealRepo.findAllByUser(u);
    }

    public List<Meal> getMealsBetweenDates(MyUser user, LocalDate startDate, LocalDate endDate){
        List<Meal> meals = mealRepo.findAllByUser(user);
        return meals.stream()
                .filter(meal -> {
                    LocalDate mealDate = meal.getCreatedAt().toLocalDate();
                    return (mealDate.isEqual(startDate) || mealDate.isAfter(startDate)) &&
                            (mealDate.isEqual(endDate) || mealDate.isBefore(endDate));
                })
                .collect(Collectors.toList());
    }
}
