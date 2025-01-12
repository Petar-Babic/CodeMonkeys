package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.forms.OAuthForm;
import GymFitnessTrackerApplication.model.dto.forms.SignupForm;
import com.amazonaws.AmazonClientException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface  MyUserService     {
    List<MyUser> listAll();
    MyUser createMyUser(@RequestBody SignupForm signupForm);
    MyUser createMyUser(@RequestBody OAuthForm oauthForm);
    MyUser getMyUser(String email);
    //UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
    void uploadFile(final String userName, final MultipartFile file) throws AmazonClientException;
    void deleteFile(final String userName);
    String getURLToFile(final String userName);
}
