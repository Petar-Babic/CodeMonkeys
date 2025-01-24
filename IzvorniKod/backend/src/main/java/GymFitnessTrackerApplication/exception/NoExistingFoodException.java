package GymFitnessTrackerApplication.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class NoExistingFoodException extends  RuntimeException {
    public NoExistingFoodException(String status){
        super(status);
    }
}



