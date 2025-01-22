package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.MyUser;

import java.util.ArrayList;
import java.util.List;

public class JwtResponse {
    private String token;
    private String id;
    private String name;
    private String email;

    private List<UserDetailsResponse> users;

    public JwtResponse(String token, String id, String name, String email) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
    }



    public String getToken() {
        return token;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }


}

