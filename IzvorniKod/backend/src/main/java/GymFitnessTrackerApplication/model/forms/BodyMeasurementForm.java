package GymFitnessTrackerApplication.model.forms;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

public class BodyMeasurementForm {
   // private ZonedDateTime utcZonedDateTime;
    private ZonedDateTime date;
    private float chest;
    private float waist;
    private float hips;
    private float thighs;
    private float biceps;

    public BodyMeasurementForm(String date, float chest, float waist, float hips, float thighs, float biceps) throws ParseException {
        this.date = ZonedDateTime.parse(date);
       this.chest = chest;
        this.waist = waist;
        this.hips = hips;
        this.thighs = thighs;
        this.biceps = biceps;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public void setChest(float chest) {
        this.chest = chest;
    }

    public void setWaist(float waist) {
        this.waist = waist;
    }

    public void setHips(float hips) {
        this.hips = hips;
    }

    public void setThighs(float thighs) {
        this.thighs = thighs;
    }

    public void setBiceps(float biceps) {
        this.biceps = biceps;
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
}
