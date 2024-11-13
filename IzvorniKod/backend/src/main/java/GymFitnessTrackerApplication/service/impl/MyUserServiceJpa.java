package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.dao.MyUserRepository;
import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.UserAlreadyExistsException;
import GymFitnessTrackerApplication.webtoken.SignupForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

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
    public MyUser createMyUser(@RequestBody SignupForm signupForm) {
        if (userRepository.countByEmail(signupForm.getEmail()) > 0)
            throw new UserAlreadyExistsException("User with that email address already exists");

        return userRepository.save(new MyUser(signupForm));
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