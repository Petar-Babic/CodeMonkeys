package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import java.util.HashSet;
import java.util.Set;

@Entity
public class MuscleGroup {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String description;
    private String image;
    @ManyToMany(mappedBy = "primaryMuscleGroup")
    private Set<Exercise> primaryToExercises = new HashSet<>();
    @ManyToMany(mappedBy = "secondaryMuscleGroup")
    private Set<Exercise> secondaryToExercises = new HashSet<>();

    public MuscleGroup() {}

    public MuscleGroup(String name, String description, String image) {
        this.name = name;
        this.description = description;
        this.image = image;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Set<Exercise> getPrimaryToExercises() {
        return primaryToExercises;
    }

    public Set<Exercise> getSecondaryToExercises() {
        return secondaryToExercises;
    }
}
