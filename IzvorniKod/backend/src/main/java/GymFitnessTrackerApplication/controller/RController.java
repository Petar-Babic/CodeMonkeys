package GymFitnessTrackerApplication.controller;


import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.service.MyUserService;
import GymFitnessTrackerApplication.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
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
