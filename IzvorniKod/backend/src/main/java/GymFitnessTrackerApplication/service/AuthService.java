package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.RefreshToken;
import GymFitnessTrackerApplication.model.domain.Role;
import GymFitnessTrackerApplication.model.dto.forms.LoginForm;
import GymFitnessTrackerApplication.model.dto.forms.OAuthForm;
import GymFitnessTrackerApplication.model.dto.forms.SignupForm;
import GymFitnessTrackerApplication.model.dto.forms.UserIDForm;
import GymFitnessTrackerApplication.model.dto.response.EmailResponse;
import GymFitnessTrackerApplication.model.dto.response.JwtResponse;
import GymFitnessTrackerApplication.model.dto.response.JwtResponseTrainer;
import GymFitnessTrackerApplication.model.dto.response.UserDetailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;


@Service
public class AuthService {

    @Autowired
    private MyUserService myUserService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private EmailService emailService;

    public JwtResponse loginaj(LoginForm loginForm){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginForm.email(),loginForm.password()));
        MyUser user = myUserService.getMyUser(loginForm.email());
        String token;
        //String token = jwtService.generateToken(myUserDetailsService.loadUserByUsername(loginForm.email()));
        // refresh token impl
        if(user.getRole().equals(Role.USER) || user.getRole().equals(Role.ADMIN)) {
            token = jwtService.generateToken(user);
            return new JwtResponse(token, user.getId().toString(), user.getName(), user.getEmail(), user.getRole().toString());
        }

        List<MyUser> trainedBy = myUserService.getTrainedBy(user);
        List<UserDetailsResponse> usrs = new ArrayList<>();
        trainedBy.forEach(
                myUser -> {
                    usrs.add(new UserDetailsResponse(myUser.getId(), myUser.getName(), myUser.getImage()));
                }
        );
        token = jwtService.generateTokenTrainer(user,usrs);
        return new JwtResponseTrainer(token,user.getId().toString(),user.getName(), user.getEmail(),trainedBy);

    }

    //treba biti jwtResponse da se vrati Jwt TOken
    public JwtResponse refreshLogin(String refreshToken){
       RefreshToken refrToken = refreshTokenService.getToken(refreshToken,"token");
        MyUser user = refrToken.getMyUser();
        String token = jwtService.generateToken(myUserDetailsService.loadUserByUsername(user.getEmail().toString()));
        return new JwtResponse(token, user.getId().toString(), user.getName(), user.getEmail(), user.getRole().toString());
    }

    public JwtResponse signup(SignupForm signupForm){
        signupForm.Encode(passwordEncoder.encode(signupForm.getPassword()));
        MyUser noviUser = myUserService.createMyUser(signupForm);
        String token = jwtService.generateToken(myUserDetailsService.loadUserByUsername(signupForm.getEmail()));
        //refresh token implementacija
         return new JwtResponse(token, noviUser.getId().toString(), noviUser.getName(), noviUser.getEmail(), noviUser.getRole().toString());
    }
    

    public JwtResponse oauth(OAuthForm oAuthForm){
        String email = oAuthForm.email();
        String name = oAuthForm.name();
        String image = oAuthForm.image();
        MyUser user;
        try{
            user = myUserService.getMyUser(email);
            if(user == null) throw new UsernameNotFoundException("Nepostoji user");
        }catch (UsernameNotFoundException ex){
            user = myUserService.createMyUser(oAuthForm);
            emailService.sendSimpleMail(new EmailResponse(oAuthForm.email(),"Registracija na našu platformu","Hvala vam"+oAuthForm.name()+ ", na prijavi na našu platorfmu :) \n Sad go for those gains ;) \n", "N/A"));

        }
        String token = jwtService.generateToken(myUserDetailsService.loadUserByUsername(email));
        return new JwtResponse(token, user.getId().toString(), name, email, user.getRole().toString());
    }

}
