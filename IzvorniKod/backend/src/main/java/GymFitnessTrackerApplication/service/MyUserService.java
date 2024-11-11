package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.domain.MyUser;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface  MyUserService     {
    List<MyUser> listAll();
    MyUser createMyUser(MyUser user);
    MyUser getMyUser(String email);
    //UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
