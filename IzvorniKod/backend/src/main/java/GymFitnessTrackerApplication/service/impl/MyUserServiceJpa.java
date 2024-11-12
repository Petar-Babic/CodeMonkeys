package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.dao.MyUserRepository;
import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyUserServiceJpa implements MyUserService {
    @Autowired
    private MyUserRepository userRepository;

    @Override
    public List<MyUser> listAll() {
        return userRepository.findAll();
    }

    @Override
    public MyUser createMyUser(MyUser user) {
        if (userRepository.countByEmail(user.getEmail()) > 0)
            throw new UserAlreadyExistsException("User with that email address already exists");

        return userRepository.save(user);
    }

    @Override
    public MyUser getMyUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }


//    @Override
//    public UserDetails loadUserByEmail(String username) throws UsernameNotFoundException {
//        Optional<MyUser> user = userRepository.findByEmail();
//    }
}
