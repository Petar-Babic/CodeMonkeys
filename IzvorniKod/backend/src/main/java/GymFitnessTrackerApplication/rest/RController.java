package GymFitnessTrackerApplication.rest;


import GymFitnessTrackerApplication.domain.MyUser;
import GymFitnessTrackerApplication.service.MyUserDetailsService;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.webtoken.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class RController {
    @Autowired
    private MyUserService userService;
    @Autowired
    private JwtService jwtService;


    @GetMapping("/")
    public String handleHome() {
        return "Welcome to  home!";
    }

    @GetMapping("/test")
    public String handleTestHome() {
        return "Welcome to test home!";
    }


    @GetMapping("/admin/home")
    public String handleAdminHome() {
        return "Welcome to ADMIN home!";
    }

    @GetMapping("/user/home")
    public String handleUserHome() {
        return "Welcome to USER home!";
    }
    
    @GetMapping("/get")
    public String handleGetUser() {
        // return all the users
        List<MyUser> users = userService.listAll();
        return users.toString();
    }








}
