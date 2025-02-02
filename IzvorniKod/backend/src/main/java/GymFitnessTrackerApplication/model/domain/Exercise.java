package GymFitnessTrackerApplication.model.domain;

import GymFitnessTrackerApplication.model.dao.MuscleGroupRepo;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String description;
    private String gif;
    @ManyToOne
    @JoinColumn(name = "created_by_user_id")
    private MyUser createdByUser;
    private boolean isApproved;
    @ManyToMany
    @JoinTable(
            name = "primary_muscleGroup_exercise",
            joinColumns = @JoinColumn(name = "exercise_id"),
            inverseJoinColumns = @JoinColumn(name = "muscleGroup_id")
    )
    private Set<MuscleGroup> primaryMuscleGroup = new HashSet<>();;
    @ManyToMany
    @JoinTable(
            name = "secondary_muscleGroup_exercise",
            joinColumns = @JoinColumn(name = "exercise_id"),
            inverseJoinColumns = @JoinColumn(name = "muscleGroup_id")
    )
    private Set<MuscleGroup> secondaryMuscleGroup = new HashSet<>();

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<PlannedExercise> plannedExercises;

    public Exercise() {}

    public Exercise(String name, String description, String gif, MyUser user) {
        this.name = name;
        this.description = description;
        this.gif = gif;
        this.createdByUser = user;
        isApproved=false;
        primaryMuscleGroup = new HashSet<>();
        secondaryMuscleGroup = new HashSet<>();
    }

    public Long getId() {return id;}

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

    public String getGif() {
        return gif;
    }

    public void setGif(String gif) {
        this.gif = gif;
    }

    public MyUser getCreatedByUser() {return createdByUser;}

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean isApproved) {
        this.isApproved = isApproved;
    }

    //mozda dodati f-je koje dodavaju muscleGroup-e u setove
    public Set<MuscleGroup> getPrimaryMuscleGroup() {
        return primaryMuscleGroup;
    }

    public void addPrimaryMuscleGroup(MuscleGroup muscleGroup){
        primaryMuscleGroup.add(muscleGroup);
    }

    public Set<MuscleGroup> getSecondaryMuscleGroup() {
        return secondaryMuscleGroup;
    }

    public void addSecondaryMuscleGroup(MuscleGroup muscleGroup){
        secondaryMuscleGroup.add(muscleGroup);
    }

    public void setPrimaryMuscleGroup(Set<MuscleGroup> primaryMuscleGroup) {
        this.primaryMuscleGroup = primaryMuscleGroup;
    }

    public void setSecondaryMuscleGroup(Set<MuscleGroup> secondaryMuscleGroup) {
        this.secondaryMuscleGroup = secondaryMuscleGroup;
    }

    public Set<PlannedExercise> getPlannedExercises() {
        return plannedExercises;
    }
}
