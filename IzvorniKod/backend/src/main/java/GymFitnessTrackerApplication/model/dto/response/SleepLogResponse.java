package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.SleepLog;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

public class SleepLogResponse {

    private String id,userId,notes;

    private ZonedDateTime date;

    private float duration;

    private int quality;

    private ZonedDateTime createdAt,updatedAt;

    public SleepLogResponse(){}

    public SleepLogResponse(SleepLog sleepLog){
        this.id=sleepLog.getId().toString();
        this.userId=sleepLog.getUser().getId().toString();
        this.date=sleepLog.getDate();
        this.duration=sleepLog.getDuration();
        this.quality = sleepLog.getQuality();
        this.notes = sleepLog.getNotes();
        this.createdAt = sleepLog.getCreatedAt();
        this.updatedAt = sleepLog.getUpdatedAt();
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getNotes() {
        return notes;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public float getDuration() {
        return duration;
    }

    public int getQuality() {
        return quality;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }
}
