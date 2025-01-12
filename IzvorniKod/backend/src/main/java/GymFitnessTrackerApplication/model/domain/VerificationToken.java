package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.*;
import jdk.jfr.ContentType;

import java.time.Instant;

@Entity
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;

    private String token;

    private Instant expiry;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private MyUser myUser;

    public Long getId() {
        return Id;
    }

    public String getToken() {
        return token;
    }

    public Instant getExpiry() {
        return expiry;
    }

    public MyUser getMyUser() {
        return myUser;
    }

    public VerificationToken(String token, Instant expiry, MyUser myUser) {
        this.token = token;
        this.expiry = expiry;
        this.myUser = myUser;
    }
}
