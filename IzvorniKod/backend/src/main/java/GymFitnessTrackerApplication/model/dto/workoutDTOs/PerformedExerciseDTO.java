package GymFitnessTrackerApplication.model.dto.workoutDTOs;

import java.util.HashSet;
import java.util.Set;

public class PerformedExerciseDTO {

    private Long plannedExerciseId;
    private Set<PerformedSetDTO> performedSets;

    public PerformedExerciseDTO(Long plannedExerciseId, Set<PerformedSetDTO> performedSets) {
        this.plannedExerciseId = plannedExerciseId;
        this.performedSets = performedSets;
    }

    public PerformedExerciseDTO(Long plannedExerciseId) {
        this.plannedExerciseId = plannedExerciseId;
        this.performedSets = new HashSet<>();
    }

    public PerformedExerciseDTO() {
        this.performedSets = new HashSet<>();
    }

    public Long getPlannedExerciseId() {
        return plannedExerciseId;
    }

    public Set<PerformedSetDTO> getPerformedSets() {
        return performedSets;
    }

    public void addPerformedSet(PerformedSetDTO performedSet) {
        this.performedSets.add(performedSet);
    }
}
