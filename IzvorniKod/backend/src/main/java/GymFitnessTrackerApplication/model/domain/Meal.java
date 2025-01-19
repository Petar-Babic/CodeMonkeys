package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.*;

import java.time.ZonedDateTime;
import java.util.List;

@Entity
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    boolean isSuggestion;

    ZonedDateTime time;

    String name;

    @ManyToOne
    @JoinColumn(name ="user_id")
    private MyUser user;

    String createdBy;

    // suggested meal id
    String suggestedId;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL)
    private List<FoodMeal> mealFoods;


    public boolean isSuggestion() {
        return isSuggestion;
    }

    public void setSuggestion(boolean suggestion) {
        isSuggestion = suggestion;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MyUser getUser() {
        return user;
    }

    public void setUser(MyUser user) {
        this.user = user;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getSuggestedId() {
        return suggestedId;
    }

    public void setSuggestedId(String suggestedId) {
        this.suggestedId = suggestedId;
    }

    public List<FoodMeal> getMealFoods() {
        return mealFoods;
    }

    public void setMealFoods(List<FoodMeal> mealFoods) {
        this.mealFoods = mealFoods;
    }


}
