package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.dao.MyUserRepository;
import GymFitnessTrackerApplication.domain.MyUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private MyUserRepository MyUserRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<MyUser> user = MyUserRepo.findByEmail(username);
        if (user.isPresent()) {
            var userObj = user.get();
            return User.builder()
                    .username(userObj.getEmail())
                    .password(userObj.getPassword())
                    .roles(userObj.getRole().toString())
                    .build();
        } else {
            throw new UsernameNotFoundException(username);
        }
    }
}
