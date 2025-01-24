package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.*;
import jdk.jfr.Enabled;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class WorkoutSession {

    @Id
    @GeneratedValue
    private Long id;

    @DateTimeFormat(pattern = "dd.MM.yyyy")
    private Date date;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private MyUser user;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_review_id")
    private Review userReview;
    @OneToOne
    @JoinColumn(name = "trainer_review_id")
    private Review trainerReview;
    @OneToMany(mappedBy = "workoutSession", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PerformedExercises> performedExercises;
    @ManyToOne
    @JoinColumn(name = "workout_id")
    private Workout workout;

    public WorkoutSession(Date date, MyUser user, Review userReview, Workout workout) {
        this.date = date;
        this.user = user;
        this.userReview = userReview;
        this.workout = workout;
        this.performedExercises = new HashSet<>();
    }

    public WorkoutSession() {}

    public Long getId() {
        return id;
    }

    public Date getDate() {
        return date;
    }

    public MyUser getUser() {
        return user;
    }

    public Review getUserReview() {
        return userReview;
    }

    public Review getTrainerReview() {
        return trainerReview;
    }

    public void setTrainerReview(Review trainerReview) {
        this.trainerReview = trainerReview;
    }

    public Set<PerformedExercises> getPerformedExercises() {
        return performedExercises;
    }

    public void addPerformedExercise(PerformedExercises performedExercise) {
        performedExercises.add(performedExercise);
    }

    public Workout getWorkout() {
        return workout;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setUser(MyUser user) {
        this.user = user;
    }

    public void setUserReview(Review userReview) {
        this.userReview = userReview;
    }

    public void setPerformedExercises(Set<PerformedExercises> performedExercises) {
        this.performedExercises = performedExercises;
    }

    public void setWorkout(Workout workout) {
        this.workout = workout;
    }
}
