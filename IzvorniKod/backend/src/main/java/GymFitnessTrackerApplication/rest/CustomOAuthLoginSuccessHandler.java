package GymFitnessTrackerApplication.rest;

import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.webtoken.JwtResponse;
import GymFitnessTrackerApplication.webtoken.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomOAuthLoginSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private MyUserDetailsService myUserDetailsService;
    @Autowired
    private MyUserService myUserService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

        String email = oauth2User.getAttribute("email");
        String token = jwtService.generateToken(myUserDetailsService.loadUserByUsername(email));
        MyUser user = myUserService.getMyUser(email);

        JwtResponse jwtResponse = new JwtResponse(token, user.getId().toString(), user.getName(), email);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(jwtResponse);
        //System.out.println(jsonResponse);
        response.getWriter().write(jsonResponse);
    }
}
