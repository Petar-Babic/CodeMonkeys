package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.Measurement;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.dto.forms.OAuthForm;
import GymFitnessTrackerApplication.model.dto.forms.SignupForm;
import GymFitnessTrackerApplication.model.dto.response.NutrionPlanResponse;
import com.amazonaws.AmazonClientException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

public interface  MyUserService     {
    List<MyUser> listAll();
    MyUser createMyUser(@RequestBody SignupForm signupForm);
    MyUser createMyUser(@RequestBody OAuthForm oauthForm);
    MyUser getMyUser(String email);

    void updateMeasurements(MyUser user,Measurement m);

    void updateGoalMeasurements(MyUser user,Measurement m);

    void updateCurrentNutrion(MyUser user, NutrionPlan nutrionPlan);


    //UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
    void uploadFile(final String userName, final MultipartFile file) throws AmazonClientException;
    void deleteFile(final String userName);
    String getURLToFile(final String userName);
}