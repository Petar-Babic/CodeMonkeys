package GymFitnessTrackerApplication.model.domain;

import GymFitnessTrackerApplication.model.dto.workoutDTOs.MuscleGroupDTO;
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
    private Set<Exercise> primaryToExercises;
    @ManyToMany(mappedBy = "secondaryMuscleGroup")
    private Set<Exercise> secondaryToExercises;

    public MuscleGroup() {}

    public MuscleGroup(MuscleGroupDTO muscleGroupDTO) {
        this.name = muscleGroupDTO.name();
        this.description = muscleGroupDTO.description();
        this.image = muscleGroupDTO.image();
        primaryToExercises = new HashSet<>();
        secondaryToExercises = new HashSet<>();
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

    public void addPrimaryToExercises(Exercise exercise) {
        primaryToExercises.add(exercise);
    }

    public Set<Exercise> getSecondaryToExercises() {
        return secondaryToExercises;
    }

    public void addSecondaryToExercises(Exercise exercise) {
        secondaryToExercises.add(exercise);
    }
}
