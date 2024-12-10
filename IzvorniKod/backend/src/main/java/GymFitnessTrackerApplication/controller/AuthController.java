package GymFitnessTrackerApplication.controller;


import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.RegistrationMethod;
import GymFitnessTrackerApplication.model.forms.LoginForm;
import GymFitnessTrackerApplication.model.forms.OAuthForm;
import GymFitnessTrackerApplication.model.forms.SignupForm;
import GymFitnessTrackerApplication.model.response.ErrorResponse;
import GymFitnessTrackerApplication.model.response.JwtResponse;
import GymFitnessTrackerApplication.service.AuthService;
import GymFitnessTrackerApplication.service.JwtService;
import GymFitnessTrackerApplication.service.MyUserDetailsService;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.exception.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

   /* @Autowired
    private MyUserService myUserService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private MyUserDetailsService myUserDetailService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;

    */
    @Autowired
    AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm){
        JwtResponse odg = authService.loginaj(loginForm);
        return  ResponseEntity.ok(odg);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupForm signupForm){
        JwtResponse noviUser = authService.signup(signupForm);
        return ResponseEntity.ok(noviUser);
    }

   /* @PostMapping("/oauth")
    public ResponseEntity<?> authenticateWithOAuth(@RequestBody OAuthForm oAuthForm){
        try{
            String email = oAuthForm.email();
            String name = oAuthForm.name();
            String image = oAuthForm.image();

            MyUser user = myUserService.getMyUser(email);
            if(user == null){
                throw new UsernameNotFoundException("User not found");
            }
            //ako postoji vrati token
            String token = jwtService.generateToken(myUserDetailService.loadUserByUsername(email));

            return ResponseEntity.ok(new JwtResponse(token, user.getId().toString(), name, email));

        }catch (UsernameNotFoundException e){
            //stvori novog u bazi
            String email = oAuthForm.email();
            String name = oAuthForm.name();
            String image = oAuthForm.image();
            MyUser newUser = myUserService.createMyUser(oAuthForm);
            String token = jwtService.generateToken(myUserDetailService.loadUserByUsername(email));
            return ResponseEntity.ok(new JwtResponse(token, newUser.getId().toString(), name, email));
        }

        catch ( AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(0, "Invalid email"));
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(0, "Internal Server Error"));
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
                        .body(new ErrorResponse(0, "User with this email already exists"));
            }
        }catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(0, "User with this email already exists"));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(0, "Internal Server Error"));
        }
    }


    */

    @PostMapping("/refresh")
    public String refreshToken(){
        return "Osvjezen token";
    }

    @PostMapping("/logout")
    public String logout(){
        return "logged out ";
    }
}
