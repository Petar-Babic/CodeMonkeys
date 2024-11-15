package GymFitnessTrackerApplication.domain;


import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Measurement {

    @Id
    @GeneratedValue
    Long measurementId;

    @ManyToOne(cascade =  CascadeType.ALL)
    private MyUser myuser;

    Date date;

    Float chest;
    Float waist;
    Float hips;

    Float thighs;

    Float biceps;

    LocalDateTime created_at;

    LocalDateTime updated_at;





}
