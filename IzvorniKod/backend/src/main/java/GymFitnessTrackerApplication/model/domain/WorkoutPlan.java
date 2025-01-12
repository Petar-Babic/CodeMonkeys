package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.*;

@Entity
public class WorkoutPlan {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String image;
    //created by user
    @ManyToOne
    @JoinColumn(name = "created_by_user_id")
    private MyUser creator;
    @OneToOne
    @JoinColumn(name = "owner_user_id")
    private MyUser owner;
    @ManyToOne
    @JoinColumn(name = "original_workout_plan_id")
    private WorkoutPlan originalWorkoutPlan;
}
