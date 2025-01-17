package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.exception.AdminRestrictedException;
import GymFitnessTrackerApplication.exception.NonExistantSleepLog;
import GymFitnessTrackerApplication.model.dao.MySleepLogRepo;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.Role;
import GymFitnessTrackerApplication.model.domain.SleepLog;
import GymFitnessTrackerApplication.model.dto.forms.SleepLogForm;
import GymFitnessTrackerApplication.service.SleepService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.HttpClientErrorException;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

@Service
public class SleepServiceJpa implements SleepService {

    @Autowired
    private MySleepLogRepo mySleepLogRepo;
    public SleepLog createFromForm(SleepLogForm form, MyUser user){
        SleepLog sl = new SleepLog(user,form);
        return mySleepLogRepo.save(sl);
    }

    public List<SleepLog> getUserLogs(MyUser user){
        List<SleepLog> logs;
        if(user.getRole().equals(Role.ADMIN)){
            logs= mySleepLogRepo.findAll();
            return logs;
        }
        logs = mySleepLogRepo.findAllByUser(user);
        return logs;
    }

    public Optional<SleepLog> getSpecificLog(MyUser user, String id){
        Optional<SleepLog> log = mySleepLogRepo.findById(Long.parseLong(id));
        if(log.isEmpty())  throw new NonExistantSleepLog("Sleep log doesnt exist");
        if(!log.get().getUser().getId().toString().equalsIgnoreCase(user.getId().toString())){
            if(user.getRole().equals(Role.ADMIN)) return log;
            throw new AdminRestrictedException("User trying to access other users sleep log");
        }
        return log;
    }

    @Transactional
    public void deleteLog(MyUser user,String id){
        Optional<SleepLog> log = mySleepLogRepo.findById(Long.parseLong(id));
        if(log.isEmpty()) throw new NonExistantSleepLog("Nepostojeci sleep log");
        if(!log.get().getUser().getId().toString().equals(user.getId().toString())){
            if(user.getRole().equals(Role.ADMIN))
                mySleepLogRepo.deleteById(Long.parseLong(id));
            throw new AdminRestrictedException("User pokusava izbrisati log drugog usera");
        }
        mySleepLogRepo.deleteById(Long.parseLong(id));
    }


    public SleepLog updateLog(@RequestBody SleepLogForm form,MyUser user,String id){
        Optional<SleepLog> optLog = mySleepLogRepo.findById(Long.parseLong(id));
        if(optLog.isEmpty()) throw new NonExistantSleepLog("Nepostojeci sleep log");
        if(!optLog.get().getUser().getId().toString().equals(user.getId().toString())){
            if(user.getRole().equals(Role.ADMIN))
                mySleepLogRepo.deleteById(Long.parseLong(id));
            throw new AdminRestrictedException("User pokusava updateati log drugog usera");
        }
        SleepLog log = optLog.get();
        log.setUpdatedAt(ZonedDateTime.now());
        log.setDate(form.getDate());
        log.setDuration(form.getDuration());
        log.setQuality(form.getQuality());
        log.setNotes(form.getNotes());
        return mySleepLogRepo.save(log);
    }
}
