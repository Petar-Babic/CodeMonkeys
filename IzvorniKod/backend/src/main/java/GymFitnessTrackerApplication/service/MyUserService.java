package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.webtoken.OAuthForm;
import GymFitnessTrackerApplication.webtoken.SignupForm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface  MyUserService     {
    List<MyUser> listAll();
    MyUser createMyUser(@RequestBody SignupForm signupForm);
    MyUser createMyUser(@RequestBody OAuthForm oauthForm);
    MyUser getMyUser(String email);
    //UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
