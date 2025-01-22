package GymFitnessTrackerApplication.model.dto.response;

import org.apache.catalina.User;

public class UserDetailsForm {

    private Long userId;
    private String name;
    private String image;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public UserDetailsForm(){}

    public UserDetailsForm(Long userId,String name,String image){
        this.image=image;
        this.userId=userId;
        this.name=name;
    }
}
