package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.joda.time.DateTime;

@Entity
public class Meal {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private int calories;
    private float protein;
    private float carbs;
    private float fat;
    //user i dailyNutritionLog
    private DateTime createdAt;
    private DateTime updatedAt;
}
