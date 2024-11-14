package GymFitnessTrackerApplication.rest;


import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.service.MyUserDetailsService;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.UserAlreadyExistsException;
import GymFitnessTrackerApplication.webtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private MyUserService myUserService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private MyUserDetailsService myUserDetailService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/oauth")
    public ResponseEntity<?> authenticateWithOAuth(@RequestBody OAuthForm oAuthForm){
        try{
            String email = oAuthForm.email();
            String name = oAuthForm.name();
            String image = oAuthForm.image();
            try{
                MyUser user = myUserService.getMyUser(email);
                //ako postoji vrati token
                String token = jwtService.generateToken(myUserDetailService.loadUserByUsername(email));
                ResponseEntity.ok(new JwtResponse(token, user.getId().toString(), name, email));

                return ResponseEntity.ok(new JwtResponse(token, user.getId().toString(), user.getName(), user.getEmail()));
            } catch (UsernameNotFoundException e){
                //stvori novog u bazi
                MyUser user = myUserService.createMyUser(oAuthForm);
                String token = jwtService.generateToken(myUserDetailService.loadUserByUsername(email));
                return ResponseEntity.ok(new JwtResponse(token, user.getId().toString(), user.getName(), user.getEmail()));
            }
        }catch ( UserAlreadyExistsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(0, "Invalid email", List.of("Invalid email sent")));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(0, "Internal Server Error", List.of("An unexpected error occurred")));
        }


    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerAndGetToken(@RequestBody SignupForm signupForm)   {
        try {
            signupForm.Encode(passwordEncoder.encode(signupForm.getPassword()));
            MyUser newUser = myUserService.createMyUser(signupForm);
            // kreirana instanca novog usera

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signupForm.getEmail(), signupForm.getPassword()));

            if (authentication.isAuthenticated()) {
                MyUser user = myUserService.getMyUser(signupForm.getEmail());
                String token = jwtService.generateToken(myUserDetailService.loadUserByUsername(signupForm.getEmail()));
                return ResponseEntity.ok(new JwtResponse(token, user.getId().toString(), user.getName(), user.getEmail()));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ErrorResponse(0, "Invalid credentials", List.of("User with this email already exists")));
            }
        }catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(0, "Invalid credentials", List.of("User with this email already exists")));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(0, "Internal Server Error", List.of("An unexpected error occurred")));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody LoginForm loginForm) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginForm.email(), loginForm.password()));


            if (authentication.isAuthenticated()) {
                MyUser user = myUserService.getMyUser(loginForm.email());
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
