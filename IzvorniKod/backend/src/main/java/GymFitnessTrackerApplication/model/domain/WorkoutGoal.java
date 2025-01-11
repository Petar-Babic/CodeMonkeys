package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.*;
import org.joda.time.DateTime;

@Entity
public class WorkoutGoal {

    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name ="user_id")
    private MyUser user;
    private String description;
    private DateTime targetDate;
    private boolean achieved;
    private DateTime achievedDate;
    private DateTime createdAt;

    public WorkoutGoal(MyUser user, String description, DateTime targetDate, boolean achieved, DateTime achievedDate, DateTime createdAt) {
        this.user = user;
        this.description = description;
        this.targetDate = targetDate;
        this.achieved = achieved;
        this.achievedDate = achievedDate;
        this.createdAt = createdAt;
    }

    public WorkoutGoal() {}

    public MyUser getUser() {
        return user;
    }

    public void setUser(MyUser user) {
        this.user = user;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DateTime getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(DateTime targetDate) {
        this.targetDate = targetDate;
    }

    public boolean isAchieved() {
        return achieved;
    }

    public void setAchieved(boolean achieved) {
        this.achieved = achieved;
    }

    public DateTime getAchievedDate() {
        return achievedDate;
    }

    public void setAchievedDate(DateTime achievedDate) {
        this.achievedDate = achievedDate;
    }

    public DateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(DateTime createdAt) {
        this.createdAt = createdAt;
    }
}
