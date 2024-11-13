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
import org.springframework.security.core.AuthenticationException;
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
import GymFitnessTrackerApplication.webtoken.JwtResponse;
import  GymFitnessTrackerApplication.webtoken.ErrorResponse;

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

    @GetMapping("/")
    public String handleHome() {
        return "Welcome to  home!";
    }

    @GetMapping("/test")
    public String handleTestHome() {
        return "Welcome to test home!";
    }


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

    @PostMapping("/api/auth/signup")
    public ResponseEntity<?> registerAndGetToken(@RequestBody SignupForm signupForm)   {
        try {
            signupForm.Encode(passwordEncoder.encode(signupForm.getPassword()));
            MyUser newUser = userService.createMyUser(signupForm);
            // kreirana instanca novog usera

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signupForm.getEmail(), signupForm.getPassword()));

            if (authentication.isAuthenticated()) {
                MyUser user = userService.getMyUser(signupForm.getEmail());
                String token = jwtService.generateToken(myUserDetailService.loadUserByUsername(signupForm.getEmail()));
                return ResponseEntity.ok(new JwtResponse(token, user.getId().toString(), user.getName(), user.getEmail()));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ErrorResponse(0, "Invalid credentials", List.of("Invalid email or password")));
            }
        }catch ( UserAlreadyExistsException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(0, "User already exists", List.of("There exists a user with this email in the DB")));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(0, "Internal Server Error", List.of("An unexpected error occurred")));
        }
    }

    @PostMapping("/api/auth/login")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody LoginForm loginForm) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginForm.email(), loginForm.password()));

            if (authentication.isAuthenticated()) {
                MyUser user = userService.getMyUser(loginForm.email());
                String token = jwtService.generateToken(myUserDetailService.loadUserByUsername(loginForm.email()));
                return ResponseEntity.ok(new JwtResponse(token, user.getId().toString(), user.getName(), user.getEmail()));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ErrorResponse(0, "Invalid credentials", List.of("Invalid email or password")));
            }
        }catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(0, "Invalid credentials", List.of("Invalid email or password")));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(0, "Internal Server Error", List.of("An unexpected error occurred")));
        }
    }

    @PostMapping("/api/auth/refresh")
    public String refreshToken(){
        return "Osvjezen token";
    }

    @PostMapping("/api/auth/logout")
    public String logout(){
        return "logged out ";
    }






}
