package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.Role;

public class UserInfoResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private String image;
    private Boolean emailVerified;

    public UserInfoResponse(Long id, String name, String email, Role role, String image, Boolean emailVerified) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.image = image;
        this.emailVerified = emailVerified;
    }

    // Getteri i setteri
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public String getImage() {
        return image;
    }

    public Boolean isEmailVerified() {
        return emailVerified;
    }
} 