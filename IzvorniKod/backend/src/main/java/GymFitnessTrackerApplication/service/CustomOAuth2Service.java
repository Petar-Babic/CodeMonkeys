package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.dao.MyUserRepository;
import GymFitnessTrackerApplication.domain.MyUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.thymeleaf.util.StringUtils;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CustomOAuth2Service extends DefaultOAuth2UserService {

    //treba provjeriti postoji li trazeni korisnik u bazi, ako ne onda ga stvoriti

    @Autowired
    private MyUserRepository myUserRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        try {
            return processOAuth2User(oAuth2User);
        } catch (OAuth2AuthenticationException e) {
            throw e;
        } catch (Exception e) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException("Internal Server Error", e.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2User oAuth2User) {
        String email = oAuth2User.getAttribute("email");
        if (StringUtils.isEmpty(email)){
            throw new OAuth2AuthenticationException("Email not found from OAuth2 provider");
        }
        Optional<MyUser> optionalUser = myUserRepository.findByEmail(email);
        if(!optionalUser.isPresent()){
            registerNewUser(oAuth2User);
        }

        return oAuth2User;
    }

    private void registerNewUser(OAuth2User oAuth2User) {
        MyUser newUser = new MyUser();
        newUser.setEmail(oAuth2User.getAttribute("email"));
        newUser.setName(oAuth2User.getName());
        newUser.setPassword(passwordEncoder.encode(oAuth2User.getAttribute("password")));
        newUser.setEmailVerified(LocalDateTime.now());
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());

        myUserRepository.save(newUser);
    }
}
