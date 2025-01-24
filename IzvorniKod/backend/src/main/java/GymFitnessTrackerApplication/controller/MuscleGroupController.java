package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.dto.response.MuscleGroupResponse;
import GymFitnessTrackerApplication.model.dto.workoutDTOs.MuscleGroupDTO;
import GymFitnessTrackerApplication.service.MuscleGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@Controller
@RequestMapping("api/")
public class MuscleGroupController {

    @Autowired
    private MuscleGroupService muscleGroupService;

    @PostMapping("/create-muscle-group")
    public ResponseEntity<?> createMuscleGroup(@RequestBody MuscleGroupDTO muscleGroupDTO) {
        MuscleGroupResponse createdMuscleGroup = muscleGroupService.createMuscleGroup(muscleGroupDTO);
        return ResponseEntity.status(HttpStatus.OK).body(createdMuscleGroup);
    }

    @PutMapping("muscle-groups/{id}")
    public ResponseEntity<?> updateMuscleGroup(@PathVariable Long id, @RequestBody MuscleGroupDTO muscleGroupDTO) {
        MuscleGroupResponse updatedMuscleGroup = muscleGroupService.updateMuscleGroup(id, muscleGroupDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatedMuscleGroup);
    }

    @DeleteMapping("muscle-groups/{id}")
    public ResponseEntity<?> deleteMuscleGroup(@PathVariable Long id) {
        muscleGroupService.deleteMuscleGroup(id);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully deleted Muscle Group");
    }

    @GetMapping("muscle-groups/{id}")
    public ResponseEntity<?> getMuscleGroupById(@PathVariable Long id) {
        MuscleGroupResponse muscleGroup = muscleGroupService.getMuscleGroupById(id);
        return ResponseEntity.status(HttpStatus.OK).body(muscleGroup);
    }

    @GetMapping("/all-muscle-groups")
    public ResponseEntity<?> getAllMuscleGroups(){
        Set<MuscleGroupResponse> muscleGroups = muscleGroupService.listAllMuscleGroups();
        return ResponseEntity.status(HttpStatus.OK).body(muscleGroups);
    }
}
