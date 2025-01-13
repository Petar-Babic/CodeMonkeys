package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Workout {

    @Id
    @GeneratedValue
    private Long id;

}
