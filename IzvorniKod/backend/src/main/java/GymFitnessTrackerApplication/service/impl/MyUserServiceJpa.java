package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.dao.MyUserRepository;
import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.domain.Role;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.UserAlreadyExistsException;
import GymFitnessTrackerApplication.webtoken.OAuthForm;
import GymFitnessTrackerApplication.webtoken.SignupForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
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

        MyUser newUser = new MyUser(signupForm);
        newUser.setEmailVerified(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(newUser);
    }

    @Override
    public MyUser createMyUser(@RequestBody OAuthForm oauthForm) {
        if (userRepository.countByEmail(oauthForm.email()) > 0)
            throw new UserAlreadyExistsException("User with that email address already exists");

        MyUser newUser = new MyUser();
        newUser.setName(oauthForm.name());
        newUser.setEmail(oauthForm.email());
        newUser.setPassword("-");
        newUser.setEmailVerified(LocalDateTime.now());
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());
        newUser.setRole(Role.USER);

        return userRepository.save(newUser);
    }


    @Override
    public MyUser getMyUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

}
