package GymFitnessTrackerApplication.model.domain;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String token;

    Instant expiry;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private MyUser myUser;

    public RefreshToken(String token, Instant expiry, MyUser myUser) {
        this.token = token;
        this.expiry = expiry;
        this.myUser = myUser;
    }

    public RefreshToken() {}

    public Long getId() {
        return id;
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
}

