package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.dao.MyMeasurementRepo;
import GymFitnessTrackerApplication.domain.Measurement;
import GymFitnessTrackerApplication.service.MyMeasurementsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyMeasurementServiceJpa implements MyMeasurementsService {

    @Autowired
    private MyMeasurementRepo measurementRepo;
    @Override
    public List<Measurement> listAll() {
        return measurementRepo.findAll();
    }

    @Override
    public Measurement createMeasurement() {
        return null;
    }
}
