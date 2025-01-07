package GymFitnessTrackerApplication.controller;


import GymFitnessTrackerApplication.exception.NonExistantToken;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.RefreshToken;
import GymFitnessTrackerApplication.model.domain.RegistrationMethod;
import GymFitnessTrackerApplication.model.forms.LoginForm;
import GymFitnessTrackerApplication.model.forms.OAuthForm;
import GymFitnessTrackerApplication.model.forms.SignupForm;
import GymFitnessTrackerApplication.model.response.ErrorResponse;
import GymFitnessTrackerApplication.model.response.JwtResponse;
import GymFitnessTrackerApplication.service.*;
import GymFitnessTrackerApplication.exception.UserAlreadyExistsException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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

import java.net.CookieStore;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @Autowired
    RefreshTokenService refreshTokenService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm, HttpServletResponse res,HttpServletRequest req){
        JwtResponse odg = authService.loginaj(loginForm);
        RefreshToken token = refreshTokenService.getToken(loginForm.email(),"mail");
        res.addCookie(new Cookie("Refresh",token.getToken()));
        return  ResponseEntity.ok(odg);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupForm signupForm,HttpServletResponse res){
        JwtResponse noviUser = authService.signup(signupForm);
        RefreshToken token= refreshTokenService.createToken(signupForm.getEmail());
        res.addCookie(new Cookie("Refresh",token.getToken()));
        return ResponseEntity.ok(noviUser);
    }

    @PostMapping("/oauth")
    public ResponseEntity<?> oauthLogin(@RequestBody OAuthForm oAuthForm){
        return
                ResponseEntity.ok("Its so jover");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request){
        String notFound= "Refresh cookie not found";
        String value =  Arrays.stream(request.getCookies())
                .filter(cookie -> "Refresh".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(notFound);

        if(value.equals(notFound))
            return ResponseEntity.status(403).body(notFound);
        else{

        }
        return  ResponseEntity.status(200).body(value);
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


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest req) throws NonExistantToken{
        String out = null;
        try {
            out = refreshTokenService.forsakeToken(req);
        } catch (NonExistantToken e) {
            throw new NonExistantToken(e.getMessage());
        }
        return ResponseEntity.ok(out);
    }
}
