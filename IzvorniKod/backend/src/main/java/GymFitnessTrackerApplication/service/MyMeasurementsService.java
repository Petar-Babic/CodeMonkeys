package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.domain.Measurement;

import java.util.List;

public interface MyMeasurementsService {
    List<Measurement> listAll();
    Measurement createMeasurement();

}
