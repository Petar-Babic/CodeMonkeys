package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.model.dao.MyUserRepository;
import GymFitnessTrackerApplication.model.domain.Measurement;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.domain.Role;
import GymFitnessTrackerApplication.model.dto.forms.BodyGoalsForm;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.exception.UserAlreadyExistsException;
import GymFitnessTrackerApplication.model.dto.forms.OAuthForm;
import GymFitnessTrackerApplication.model.dto.forms.SignupForm;
import com.amazonaws.AmazonClientException;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MyUserServiceJpa implements MyUserService {
    @Autowired
    private MyUserRepository userRepository;
    @Autowired
    private AmazonS3 s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Override
    public List<MyUser> listAll() {
        return userRepository.findAll();
    }

    @Override
    public MyUser createMyUser(@RequestBody SignupForm signupForm) {
        if (userRepository.countByEmail(signupForm.getEmail()) > 0)
            throw new UserAlreadyExistsException("User with that email address already exists");

        MyUser newUser = new MyUser(signupForm);
        newUser.setUpdatedAt(LocalDateTime.now());
        newUser.setEmailVerified(false);

        return userRepository.save(newUser);
    }

    @Transactional
    @Override
    public void updateMeasurements(MyUser user,Measurement m){
        userRepository.findByEmail(user.getEmail()).ifPresent(
                user1 -> {
                    user1.setBodyMeasurement(m);
                    userRepository.save(user1);
                }
        );
    }

    @Transactional
    @Override
    public void updateGoalMeasurements(MyUser user,Measurement m){
        userRepository.findByEmail(user.getEmail()).ifPresent(
                (user1) -> {
                    user1.setGoalBodyMeasurements(m);
                    userRepository.save(user1);
                }
        );
    }

    @Transactional
    @Override
    public void updateCurrentNutrion(MyUser user, NutrionPlan nutrionPlan){
        userRepository.findByEmail(user.getEmail()).ifPresent(
                (usr) -> {
                    usr.setNutrionPlan(nutrionPlan);
                    userRepository.save(usr);
                }
        );
    }


    @Override
    public MyUser createMyUser(@RequestBody OAuthForm oauthForm) {
        if (userRepository.countByEmail(oauthForm.email()) > 0)
            throw new UserAlreadyExistsException("User with that email address already exists");

        MyUser newUser = new MyUser();
        newUser.setName(oauthForm.name());
        newUser.setEmail(oauthForm.email());
        newUser.setPassword("-");
        newUser.setEmailVerified(false);
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());
        newUser.setRole(Role.USER);

        return userRepository.save(newUser);
    }


    @Override
    public MyUser getMyUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    @Override
    public void uploadFile(String email, MultipartFile file) throws AmazonClientException {
        Optional<MyUser> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()){
            MyUser myUser = optionalUser.get();
            File fFile = convertMultipartFileToFile(file);
            String keyName = email + "_" + System.currentTimeMillis();
            myUser.setImage(keyName);
            userRepository.save(myUser);
            //usput prije obrisi onu staru
            s3Client.putObject(new PutObjectRequest(bucketName, keyName, fFile));
            fFile.delete();
        }
    }

    @Override
    public void deleteFile(String email) {
        Optional<MyUser> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            MyUser myUser = optionalUser.get();
            String fileName = myUser.getImage();
            System.out.println(fileName);
            if(fileName!=null){
                s3Client.deleteObject(new DeleteObjectRequest(bucketName, fileName));
            }
        }
    }

    @Override
    public String getURLToFile(String userName) {
        Optional<MyUser> optionalUser = userRepository.findByEmail(userName);
        if (optionalUser.isPresent()){
            MyUser myUser = optionalUser.get();
            String fileName = myUser.getImage();
            Date expiration = new Date(System.currentTimeMillis() + 3600 * 1000);
            URL url = s3Client.generatePresignedUrl(bucketName,fileName,expiration, HttpMethod.GET);
            return url.toString();
        }
        return null;
    }


    private File convertMultipartFileToFile(MultipartFile mpFile){
        File convertedFile = new File(mpFile.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)){
            fos.write(mpFile.getBytes());
        }catch(IOException e){
            return null;
        }
        return convertedFile;
    }
}