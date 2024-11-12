package GymFitnessTrackerApplication.rest;


import GymFitnessTrackerApplication.dao.MyUserRepository;
import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.domain.Role;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.UserAlreadyExistsException;
import GymFitnessTrackerApplication.webtoken.JwtService;
import GymFitnessTrackerApplication.webtoken.LoginForm;
import GymFitnessTrackerApplication.webtoken.SignupForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.interceptor.CacheOperationInvoker;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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


    @GetMapping("/admin/home")
    public String handleAdminHome() {
        return "Welcome to ADMIN home!";
    }

    @GetMapping("/user/home")
    public String handleUserHome() {
        return "Welcome to USER home!";
    }
    
    @GetMapping("/get")
    public String handleGetUser() {
        // return all the users
        List<MyUser> users = userService.listAll();
        return users.toString();
    }

    /*Korda verzija
    @PostMapping("/api/auth/signup")
    public MyUser createUser(@RequestBody MyUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(user.getRole()==null){ user.setRole(Role.USER); }
        user.setEmailVerified(LocalDateTime.now());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userService.createMyUser(user);
    }
     */
    @PostMapping("/api/auth/signup")
    public String createUser(@RequestBody SignupForm signupForm) throws Throwable
    {
            signupForm.Encode(passwordEncoder.encode(signupForm.getPassword()));
            MyUser newUser = userService.createMyUser(signupForm);
            //return ResponseEntity.status(HttpStatus.CREATED).body(newUser);

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signupForm.getEmail(), signupForm.getPassword() ));
            if(authentication.isAuthenticated()){
                return jwtService.generateToken(myUserDetailService.loadUserByUsername(signupForm.getEmail()));
            }else throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Unsuccessfull signup");
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
