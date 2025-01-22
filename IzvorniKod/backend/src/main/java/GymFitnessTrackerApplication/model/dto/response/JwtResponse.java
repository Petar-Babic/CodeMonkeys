package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.MyUser;
import io.jsonwebtoken.Jwt;

import java.util.ArrayList;
import java.util.List;

public class JwtResponse {
    private String token;
    private String id;
    private String name;
    private String email;

    private List<UserDetailsForm> users;

    public JwtResponse(String token, String id, String name, String email) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public JwtResponse(String token, String id, String name, String email, List<MyUser> users){
        this(token,id,name,email);
        List<UserDetailsForm> usrs = new ArrayList<>();
        users.forEach(
                myUser -> {
                    usrs.add(new UserDetailsForm(myUser.getId(), myUser.getName(), myUser.getImage()));
                }
        );
        this.users = usrs;
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

