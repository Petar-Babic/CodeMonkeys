package GymFitnessTrackerApplication.response;

import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

public class BodyMeasurementsResponse {
    public String id;
    public String userId;
    public LocalDateTime date;
    public float chest;
    public float waist;
    public float hips;
    public float thighs;
    public float biceps;
    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;

    public BodyMeasurementsResponse(String id, String userId, LocalDateTime date, float chest, float waist, float hips, float thighs, float biceps, LocalDateTime createdAt, LocalDateTime updatedAt) {
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
}
