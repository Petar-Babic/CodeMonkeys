package GymFitnessTrackerApplication.rest;


import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.domain.Role;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.UserAlreadyExistsException;
import GymFitnessTrackerApplication.webtoken.JwtService;
import GymFitnessTrackerApplication.webtoken.LoginForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/")
public class RController {
    @Autowired
    private MyUserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private MyUserDetailsService myUserDetailService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    private static final Logger logger = LoggerFactory.getLogger(RController.class);


    @GetMapping("/admin/home")
    public String handleAdminHome() {
        return "Welcome to ADMIN home!";
    }

    @GetMapping("/user/home")
    public String handleUserHome() {
        return "Welcome to USER home!";
    }

    @PostMapping("/api/auth/signup")
    public MyUser createUser(@RequestBody MyUser user) {
        UserDetails userInDatabase = myUserDetailService.loadUserByUsername(user.getEmail());
        if(userInDatabase != null) {
            throw new UserAlreadyExistsException("User with that email address already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(user.getRole()==null){ user.setRole(Role.USER); }
        user.setEmailVerified(LocalDateTime.now());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userService.createMyUser(user);
    }

    @GetMapping("/get")
    public String handleGetUser() {
        // return all the users
        List<MyUser> users = userService.listAll();
        return users.toString();
    }


    @PostMapping("/api/auth/login")
    public String authenticateAndGetToken(@RequestBody LoginForm loginForm) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginForm.email(), loginForm.password() ));

        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(myUserDetailService.loadUserByUsername(loginForm.email()));
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
    }

}
