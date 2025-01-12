package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.*;
import org.joda.time.DateTime;

import java.time.ZonedDateTime;
import java.util.Date;

@Entity
public class SleepLog {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name ="user_id")
    private MyUser user;
    private ZonedDateTime date;
    private Float duration;  //in hours
    private Integer quality;
    private String notes;
    private DateTime createdAt;

    public SleepLog(MyUser user, ZonedDateTime date, float duration, int quality, String notes, DateTime createdAt) {
        this.user = user;
        this.date = date;
        this.duration = duration;
        this.quality = quality;
        this.notes = notes;
        this.createdAt = createdAt;
    }
    public SleepLog() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MyUser getUser() {
        return user;
    }

    public void setUser(MyUser user) {
        this.user = user;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public float getDuration() {
        return duration;
    }

    public void setDuration(float duration) {
        this.duration = duration;
    }

    public int getQuality() {
        return quality;
    }

    public void setQuality(int quality) {
        this.quality = quality;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public DateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(DateTime createdAt) {
        this.createdAt = createdAt;
    }
}
