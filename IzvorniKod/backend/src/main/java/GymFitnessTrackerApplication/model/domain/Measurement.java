package GymFitnessTrackerApplication.model.domain;


import GymFitnessTrackerApplication.model.forms.BodyMeasurementForm;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.ZonedDateTime;
import java.util.Date;

@Entity
public class Measurement {

    @Id
    @GeneratedValue
    private Long measurementId;

    @ManyToOne(cascade =  CascadeType.ALL)
    private MyUser myuser;

    private Date date;

    private Float chest;
    private Float waist;
    private Float hips;

    private Float thighs;

    private Float biceps;

    private ZonedDateTime created_at;

    private ZonedDateTime updated_at;


    public Long getMeasurementId() {
        return measurementId;
    }

    public void setMeasurementId(Long measurementId) {
        this.measurementId = measurementId;
    }

    public MyUser getMyuser() {
        return myuser;
    }

    public void setMyuser(MyUser myuser) {
        this.myuser = myuser;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Float getChest() {
        return chest;
    }

    public void setChest(Float chest) {
        this.chest = chest;
    }

    public Float getWaist() {
        return waist;
    }

    public void setWaist(Float waist) {
        this.waist = waist;
    }

    public Float getHips() {
        return hips;
    }

    public void setHips(Float hips) {
        this.hips = hips;
    }

    public Float getThighs() {
        return thighs;
    }

    public void setThighs(Float thighs) {
        this.thighs = thighs;
    }

    public Float getBiceps() {
        return biceps;
    }

    public void setBiceps(Float biceps) {
        this.biceps = biceps;
    }

    public ZonedDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(ZonedDateTime created_at) {
        this.created_at = created_at;
    }

    public ZonedDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(ZonedDateTime updated_at) {
        this.updated_at = updated_at;
    }

    public Measurement(){}
    public Measurement(MyUser measurementId, @RequestBody BodyMeasurementForm bd){
        this.myuser=measurementId;
        this.date=Date.from(bd.getDate().toInstant());
        this.created_at=bd.getDate();
        this.updated_at=bd.getDate();
        this.hips=bd.getHips();
        this.biceps=bd.getBiceps();
        this.chest=bd.getChest();
        this.thighs=bd.getThighs();
        this.waist=bd.getWaist();

    }

}
