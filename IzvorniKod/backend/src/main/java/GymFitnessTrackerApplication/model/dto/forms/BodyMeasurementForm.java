package GymFitnessTrackerApplication.model.dto.forms;

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

    private float height;
    private float weight;

    private boolean isGoal;

    public BodyMeasurementForm() {
        this.date = ZonedDateTime.now();
    }


    public BodyMeasurementForm(float chest, float waist, float hips, float thighs, float biceps,float height,float weight,boolean isGoal) throws ParseException {
        this.date = ZonedDateTime.now();
       this.chest = chest;
        this.waist = waist;
        this.hips = hips;
        this.thighs = thighs;
        this.biceps = biceps;
        this.height = height;
        this.weight = weight;
        this.isGoal = isGoal;
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

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public boolean isGoal() {
        return isGoal;
    }

    public void setGoal(boolean goal) {
        isGoal = goal;
    }
}

