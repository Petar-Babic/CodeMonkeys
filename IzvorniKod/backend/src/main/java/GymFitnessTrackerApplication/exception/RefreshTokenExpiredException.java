package GymFitnessTrackerApplication.exception;

import org.hibernate.dialect.unique.CreateTableUniqueDelegate;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class RefreshTokenExpiredException extends  IllegalAccessException{
    public RefreshTokenExpiredException(String status) {
        super(status);
    }
}
