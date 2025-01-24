package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.model.dao.MyMeasurementRepo;
import GymFitnessTrackerApplication.model.domain.Measurement;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.dto.forms.BodyGoalsForm;
import GymFitnessTrackerApplication.model.dto.forms.BodyMeasurementForm;
import GymFitnessTrackerApplication.service.MyMeasurementsService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MyMeasurementServiceJpa implements MyMeasurementsService {

    @Autowired
    private MyMeasurementRepo measurementRepo;
    @Override
    public List<Measurement> listAll() {
        return measurementRepo.findAll();
    }

    @Override
    public Measurement createMeasurement(MyUser id, @RequestBody BodyMeasurementForm bodyMeasurementForm,String deciding) {
        Measurement m = new Measurement(id,bodyMeasurementForm);
        m.setUpdated_at(bodyMeasurementForm.getDate());
        m.setCreated_at(bodyMeasurementForm.getDate());
        if(deciding.equalsIgnoreCase("goals"))
            m.setGoal(true);
        else
            m.setGoal(false);
        return measurementRepo.save(m);
    }

    @Override
    public List<Measurement> getMyMeasurements(MyUser user){
        List<Measurement> list=  measurementRepo.findAllByMyuser(user);
        if(list.isEmpty())
            throw new UsernameNotFoundException("User not found with email: " + user.getEmail());
        return list.stream().filter( measurement -> measurement.isGoal() == false).collect(Collectors.toList());

    }

    @Override
    public List<Measurement> getMyGoalMeasurements(MyUser user){
        List<Measurement> list=  measurementRepo.findAllByMyuser(user);
        if(list.isEmpty())
            throw new UsernameNotFoundException("User not found with email: " + user.getEmail());
        return list.stream().filter( measurement -> measurement.isGoal() == true).collect(Collectors.toList());
    }

    @Transactional
    public void createGoalMeasurementFromStats(MyUser user, @RequestBody BodyGoalsForm form){
        Measurement m = new Measurement();
        m.setWeight(form.getWeight());
        m.setHeight(form.getHeight());
        m.setCreated_at(ZonedDateTime.now());
        m.setUpdated_at(ZonedDateTime.now());
        m.setDate(Date.from(Instant.now()));
        m.setMyuser(user);
        m.setGoal(true);
        measurementRepo.save(m);
    }
}
