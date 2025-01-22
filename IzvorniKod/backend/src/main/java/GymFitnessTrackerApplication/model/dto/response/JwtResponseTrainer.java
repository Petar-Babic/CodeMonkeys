package GymFitnessTrackerApplication.model.dto.response;

import GymFitnessTrackerApplication.model.domain.MyUser;

import java.util.ArrayList;
import java.util.List;

public class JwtResponseTrainer extends  JwtResponse{

    private List<UserDetailsResponse> users;

    public JwtResponseTrainer(String token, String id, String name, String email, List<MyUser> users){
        super(token,id,name,email);
        List<UserDetailsResponse> usrs = new ArrayList<>();
        users.forEach(
                myUser -> {
                    usrs.add(new UserDetailsResponse(myUser.getId(), myUser.getName(), myUser.getImage()));
                }
        );
        this.users = usrs;
    }

    public List<UserDetailsResponse> getUsers() {
        return users;
    }

    public JwtResponseTrainer(String token, String id, String name, String email) {
        super(token,id,name,email);
    }
}
