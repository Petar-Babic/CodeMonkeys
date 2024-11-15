package GymFitnessTrackerApplication.response;

import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
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
    public ZonedDateTime createdAt;
    public ZonedDateTime updatedAt;

    public BodyMeasurementsResponse(String id, String userId, ZonedDateTime date, float chest, float waist, float hips, float thighs, float biceps, ZonedDateTime createdAt, ZonedDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.date = date;
        this.chest = chest;
        this.waist = waist;
        this.hips = hips;
        this.thighs = thighs;
        this.biceps = biceps;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }
}
