package GymFitnessTrackerApplication.model.dto.forms;

import GymFitnessTrackerApplication.service.SleepService;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class SleepLogForm {

    ZonedDateTime date;
    float duration;

    int quality;

    String notes;

    public SleepLogForm(){
    }

    public SleepLogForm(ZonedDateTime dateTime,float duration,int quality,String notes){
        this.date = dateTime;
        this.duration = duration;
        this.notes = notes;
        this.quality = quality;
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
}
