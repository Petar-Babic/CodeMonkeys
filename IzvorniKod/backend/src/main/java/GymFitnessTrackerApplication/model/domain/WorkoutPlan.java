package GymFitnessTrackerApplication.model.domain;

import GymFitnessTrackerApplication.model.dto.forms.WorkoutPlanForm;
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

    public WorkoutPlan(String name, String description, String image, MyUser creator, MyUser owner) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.creator = creator;
        this.owner = owner;
    }
    public WorkoutPlan() {}

    public WorkoutPlan(MyUser user, WorkoutPlanForm workoutPlanForm) {
        this.creator = user;
        this.name = workoutPlanForm.name();
        this.description = workoutPlanForm.description();
        this.image = workoutPlanForm.image();

    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public MyUser getCreator() {
        return creator;
    }

    public void setCreator(MyUser creator) {
        this.creator = creator;
    }

    public MyUser getOwner() {
        return owner;
    }

    public void setOwner(MyUser owner) {
        this.owner = owner;
    }

    public WorkoutPlan getOriginalWorkoutPlan() {
        return originalWorkoutPlan;
    }

    public void setOriginalWorkoutPlan(WorkoutPlan originalWorkoutPlan) {
        this.originalWorkoutPlan = originalWorkoutPlan;
    }
}
