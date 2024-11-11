package GymFitnessTrackerApplication.rest;


import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.webtoken.JwtService;
import GymFitnessTrackerApplication.webtoken.LoginForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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


    @GetMapping("/home")
    public String handleWelcome() {
        return "Welcome to home!";
    }

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
        user.setPassword(passwordEncoder.encode(user.getPassword()));
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
        logger.info("Login attempt for email: {}", loginForm.email());
        // Don't log the actual password in production
        logger.info("Attempting authentication for user: {}", loginForm.email());
    
        try {
            MyUser user = userService.getMyUser(loginForm.email());
            logger.info("User found: {}", user);
    
            // Log the encoded password from the database
            logger.info("Stored encoded password: {}", user.getPassword());
    
            // Log the result of password matching
            boolean passwordMatches = passwordEncoder.matches(loginForm.password(), user.getPassword());
            logger.info("Password matches: {}", passwordMatches);
    
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginForm.email(), loginForm.password())
            );
    
            logger.info("Authentication successful for user: {}", loginForm.email());
    
            return jwtService.generateToken(myUserDetailService.loadUserByUsername(loginForm.email()));
        } catch (IncorrectResultSizeDataAccessException e) {
            logger.error("Multiple users found with the same email: {}", loginForm.email());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Authentication failed due to data inconsistency");
        } catch (AuthenticationException e) {
            logger.error("Authentication failed for user: {}", loginForm.email(), e);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email/password");
        }
    }

}
