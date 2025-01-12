package GymFitnessTrackerApplication.model.domain;


import GymFitnessTrackerApplication.model.dto.forms.BodyMeasurementForm;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.ZonedDateTime;

@Entity
public class Measurement {

    @Id
    @GeneratedValue
    private Long id;
    private Float height;
    private Float weight;
    private Float chest;
    private Float waist;
    private Float hips;
    private Float thighs;
    private Float biceps;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;


    public Long getId() { return id; }

    public Float getHeight() { return height; }

    public void setHeight(Float height) { this.height = height; }

    public Float getWeight() { return weight; }

    public void setWeight(Float weight) {this.weight = weight; }

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

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Measurement(){}

    public Measurement(@RequestBody BodyMeasurementForm bd){
        this.createdAt=bd.getDate();
        this.updatedAt=bd.getDate();
        this.hips=bd.getHips();
        this.biceps=bd.getBiceps();
        this.chest=bd.getChest();
        this.thighs=bd.getThighs();
        this.waist=bd.getWaist();

    }

}
