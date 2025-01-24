package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.Measurement;
import GymFitnessTrackerApplication.model.dto.forms.BodyMeasurementForm;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class BodyMeasurementsResponse {
    public String id;
    public String userId;
    public ZonedDateTime date;
    public float chest;
    public float waist;
    public float hips;
    public float thighs;
    public float biceps;

    public float height;
    public float weight;

    public boolean isGoal;

    public BodyMeasurementsResponse(Measurement m){
        this.weight=m.getWeight();
        this.height=m.getHeight();
        this.date=m.getDate().toInstant().atZone(ZoneId.systemDefault());
        this.biceps=m.getBiceps();
        this.id = m.getMeasurementId().toString();
        this.userId = m.getMyuser().getId().toString();
        this.chest = m.getChest();
        this.waist = m.getWaist();
        this.thighs = m.getThighs();
        this.isGoal = m.isGoal();
        this.hips=m.getHips();

    }

    public BodyMeasurementsResponse(String id, String userId, ZonedDateTime date, float chest, float waist, float hips, float thighs, float biceps,float height,float weight, boolean isGoal) {
        this.id = id;
        this.userId = userId;
        this.date = date;
        this.chest = chest;
        this.waist = waist;
        this.hips = hips;
        this.thighs = thighs;
        this.biceps = biceps;
        this.height = height;
        this.weight = weight;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public float getChest() {
        return chest;
    }

    public float getWaist() {
        return waist;
    }

    public float getHips() {
        return hips;
    }

    public float getThighs() {
        return thighs;
    }

    public float getBiceps() {
        return biceps;
    }

    public float getHeight() {
        return height;
    }

    public float getWeight() {
        return weight;
    }
}
