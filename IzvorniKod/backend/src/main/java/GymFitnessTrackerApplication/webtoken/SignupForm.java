package GymFitnessTrackerApplication.webtoken;

import GymFitnessTrackerApplication.domain.RegistrationMethod;

import javax.swing.*;

public class SignupForm{

    String email,name, password;
    String encodedPass;

    SignupForm(String email,String name,String password){
        this.email=email;
        this.password=password;
        this.name=name;
    }

    public void Encode(String pass){
        this.encodedPass=pass;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }
    public String getEncodedPass() {
        return encodedPass;
    }

}
