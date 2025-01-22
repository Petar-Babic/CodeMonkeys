package GymFitnessTrackerApplication.controller;


import GymFitnessTrackerApplication.exception.NonExistantToken;
import GymFitnessTrackerApplication.model.domain.RefreshToken;
import GymFitnessTrackerApplication.model.dto.forms.LoginForm;
import GymFitnessTrackerApplication.model.dto.forms.OAuthForm;
import GymFitnessTrackerApplication.model.dto.forms.SignupForm;
import GymFitnessTrackerApplication.model.dto.response.EmailResponse;
import GymFitnessTrackerApplication.model.dto.response.JwtResponse;
import GymFitnessTrackerApplication.model.dto.response.JwtResponseTrainer;
import GymFitnessTrackerApplication.service.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @Autowired
    RefreshTokenService refreshTokenService;

    @Autowired
    EmailService emailService;

    /*private final WebClient webClient;

    public AuthController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:8080").build(); // Adjust as needed
    }*/


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm, HttpServletResponse res,HttpServletRequest req){
        JwtResponse odg = authService.loginaj(loginForm);
        RefreshToken token = refreshTokenService.getToken(loginForm.email(),"mail");
        res.addCookie(new Cookie("Refresh",token.getToken()));
        if(odg instanceof JwtResponseTrainer)
            return ResponseEntity.ok((JwtResponseTrainer) odg);
        return  ResponseEntity.ok(odg);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupForm signupForm,HttpServletResponse res){
        JwtResponse noviUser = authService.signup(signupForm);
        RefreshToken token= refreshTokenService.createToken(signupForm.getEmail());
        res.addCookie(new Cookie("Refresh",token.getToken()));
        emailService.sendHTMLMail(new EmailResponse(signupForm.getEmail(),"Registracija na našu platformu","Hvala vam na prijavi na našu platorfmu :) \n Sad go for those gains ;) \n", "N/A"));

        return ResponseEntity.ok(noviUser);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request){
        String notFound= "Refresh cookie not found";
        Cookie[] cookies = request.getCookies();

        if(cookies.length < 1)
            return ResponseEntity.status(403).body(notFound);
        String value = null;
        for (Cookie cookie : cookies) {
            if ("Refresh".equals(cookie.getName())) {
                value = cookie.getValue();
                break;
            }
        }


       /* String value =  Arrays.stream(request.getCookies())
                .filter(cookie -> "Refresh".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(notFound);*/

        // ako nema tokena
        // ili ako je dobiveni token ili invalid ili istjekao
        if(value.equals(notFound) || (!refreshTokenService.isValid(value) || refreshTokenService.Expired(value)))
            return ResponseEntity.status(403).body(notFound);
        JwtResponse refreshLogin = authService.refreshLogin(value);
        return  ResponseEntity.status(200).body(refreshLogin);
    }


   @PostMapping("/oauth")
    public ResponseEntity<?> authenticateWithOAuth(@RequestBody OAuthForm oAuthForm,HttpServletResponse res){
        JwtResponse jwt = authService.oauth(oAuthForm);
        RefreshToken token = refreshTokenService.getToken(oAuthForm.email(),"mail");
        res.addCookie(new Cookie("Refresh",token.getToken()));
        return ResponseEntity.status(200).body(jwt);
    }

  /*  @GetMapping("/send-mail")
    public ResponseEntity<String> sendMail(@RequestParam String recep)
    {
        emailService.sendHTMLMail(new EmailResponse(recep,"Registracija na našu platformu","Hvala vam na prijavi na našu platorfmu :) \n Sad go for those gains ;) \n", "N/A"));
        return ResponseEntity.ok("Email sent to "+recep);
    }*/
    /*
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
