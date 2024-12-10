package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.forms.LoginForm;
import GymFitnessTrackerApplication.model.forms.SignupForm;
import GymFitnessTrackerApplication.model.response.JwtResponse;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.security.Password;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public JwtResponse loginaj(LoginForm loginForm){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginForm.email(),loginForm.password()));
        MyUser user = myUserService.getMyUser(loginForm.email());
        String token = jwtService.generateToken(myUserDetailsService.loadUserByUsername(loginForm.email()));
        // refresh token impl
        return new JwtResponse(token,user.getId().toString(),user.getName(), user.getEmail());
    }

    public JwtResponse signup(SignupForm signupForm){
        signupForm.Encode(passwordEncoder.encode(signupForm.getPassword()));
        MyUser noviUser = myUserService.createMyUser(signupForm);

        String token = jwtService.generateToken(myUserDetailsService.loadUserByUsername(signupForm.getEmail()));
        //refresh token implementacija

        return new JwtResponse(token,noviUser.getId().toString(),noviUser.getName(),noviUser.getEmail());
    }
}
