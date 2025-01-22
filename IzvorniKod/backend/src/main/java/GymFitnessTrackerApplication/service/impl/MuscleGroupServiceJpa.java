package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.exception.NonExistantExercise;
import GymFitnessTrackerApplication.model.dao.ExerciseRepo;
import GymFitnessTrackerApplication.model.dao.MuscleGroupRepo;
import GymFitnessTrackerApplication.model.domain.Exercise;
import GymFitnessTrackerApplication.model.domain.MuscleGroup;
import GymFitnessTrackerApplication.model.dto.response.MuscleGroupResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.MuscleGroupDTO;
import GymFitnessTrackerApplication.service.MuscleGroupService;
import com.amazonaws.services.s3.AmazonS3;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MuscleGroupServiceJpa implements MuscleGroupService {

    @Autowired
    private ExerciseRepo exerciseRepo;
    @Autowired
    private MuscleGroupRepo muscleGroupRepo;
    @Autowired
    private AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;


    @Override
    public MuscleGroupResponse createMuscleGroup(MuscleGroupDTO muscleGroupDTO) {
        MuscleGroup newMuscleGroup = new MuscleGroup(muscleGroupDTO);
        muscleGroupRepo.save(newMuscleGroup);
        return new MuscleGroupResponse(newMuscleGroup.getId(), newMuscleGroup.getName(), newMuscleGroup.getDescription(), newMuscleGroup.getImage());
    }


    @Override
    public MuscleGroupResponse updateMuscleGroup(Long id, MuscleGroupDTO muscleGroupDTO) {
        MuscleGroup muscleGroup = muscleGroupRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Muscle group with id " + id + " not found"));

        muscleGroup.setName(muscleGroupDTO.name());
        muscleGroup.setDescription(muscleGroupDTO.description());
        if (muscleGroupDTO.image() != null) {
            muscleGroup.setImage(muscleGroupDTO.image());
        }

        muscleGroupRepo.save(muscleGroup);
        return new MuscleGroupResponse(muscleGroup.getId(), muscleGroup.getName(), muscleGroup.getDescription(), muscleGroup.getImage());
    }

    @Override
    public void deleteMuscleGroup(Long id){
        MuscleGroup muscleGroup = muscleGroupRepo.findById(id).
                orElseThrow(() -> new NonExistantExercise("Muscle group with "+id+"not found"));

        //treba li paziti na vezu???
        muscleGroupRepo.delete(muscleGroup);
    }

    //prepravi s excpetion-om
    @Override
    public MuscleGroupResponse getMuscleGroupById(Long id) {
        MuscleGroup muscleGroup = muscleGroupRepo.findById(id).orElse(null);
        if (muscleGroup == null) return null;
        return new MuscleGroupResponse(muscleGroup.getId(), muscleGroup.getName(), muscleGroup.getDescription(), muscleGroup.getImage());
    }

    @Override
    public Set<MuscleGroupResponse> listAllMuscleGroups() {
        List<MuscleGroup> muscleGroups = muscleGroupRepo.findAll();
        Set<MuscleGroupResponse> result = new HashSet<>();
        for(MuscleGroup muscleGroup : muscleGroups){
            MuscleGroupResponse mgDto = new MuscleGroupResponse(muscleGroup.getId(), muscleGroup.getName(), muscleGroup.getDescription(), muscleGroup.getImage());
            result.add(mgDto);
        }
        return result;
    }
}
