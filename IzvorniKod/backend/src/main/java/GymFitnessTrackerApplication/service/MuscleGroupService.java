package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.dto.response.MuscleGroupResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.MuscleGroupDTO;

import java.util.Set;


public interface MuscleGroupService {
    public MuscleGroupResponse createMuscleGroup(MuscleGroupDTO muscleGroupDTO);
    public MuscleGroupResponse updateMuscleGroup(Long id, MuscleGroupDTO muscleGroupDTO);
    public void deleteMuscleGroup(Long id);
    public MuscleGroupResponse getMuscleGroupById(Long id);
    public Set<MuscleGroupResponse> listAllMuscleGroups();

}
