package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.SleepLog;
import GymFitnessTrackerApplication.model.dto.forms.SleepLogForm;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

public interface SleepService {

    SleepLog createFromForm(@RequestBody SleepLogForm form, MyUser user);

    List<SleepLog> getUserLogs(MyUser user);

    List<SleepLog> getAllUserLogs(MyUser user);

    Optional<SleepLog> getSpecificLog(MyUser user,String id);

    void deleteLog(MyUser user,String id);

    SleepLog updateLog(@RequestBody SleepLogForm form,MyUser user,String id);

    //ovisno aako cu pagination
    // List<SleepLog> getAllLogs();
}
