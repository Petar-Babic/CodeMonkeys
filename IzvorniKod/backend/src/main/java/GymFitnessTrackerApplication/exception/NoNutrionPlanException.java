package GymFitnessTrackerApplication.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class NoNutrionPlanException extends RuntimeException{

    public NoNutrionPlanException(String status) {
        super(status);
    }
}
