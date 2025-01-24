package GymFitnessTrackerApplication.model.dto.workoutDTOs;

import java.util.HashSet;
import java.util.Set;

public class PerformedExerciseDTO {

    private Long id;
    private Long plannedExerciseId;
    private Set<PerformedSetDTO> performedSets;

    public PerformedExerciseDTO(Long id, Long plannedExerciseId, Set<PerformedSetDTO> performedSets) {
        this.id = id;
        this.plannedExerciseId = plannedExerciseId;
        this.performedSets = performedSets;
    }

    public PerformedExerciseDTO(Long id, Long plannedExerciseId) {
        this.id = id;
        this.plannedExerciseId = plannedExerciseId;
        this.performedSets = new HashSet<>();
    }
    public PerformedExerciseDTO() {}

    public Long getPlannedExerciseId() {
        return plannedExerciseId;
    }

    public Set<PerformedSetDTO> getPerformedSets() {
        return performedSets;
    }

    public void addPerformedSet(PerformedSetDTO performedSet) {
        this.performedSets.add(performedSet);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPlannedExerciseId(Long plannedExerciseId) {
        this.plannedExerciseId = plannedExerciseId;
    }

    public void setPerformedSets(Set<PerformedSetDTO> performedSets) {
        this.performedSets = performedSets;
    }
}
