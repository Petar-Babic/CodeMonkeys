package GymFitnessTrackerApplication.exception;


import GymFitnessTrackerApplication.service.AuthService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.QueryTimeoutException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.SQLSyntaxErrorException;

@ControllerAdvice
public class CustomExceptionHandler {
    /*
    model pisanja custom handlera
    @ExceptionHandler(value = ...#")
    @ResponseStatus(HttpsStatus.XXX)


     */
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return new ResponseEntity<>("User with this email already exists", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<String> serverError(){
        return new ResponseEntity<>("Internal server error",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public  ResponseEntity<String> handleUsernameNotFound(UsernameNotFoundException ex ){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Invalid data: " + ex.getRootCause().getMessage());
    }

    @ExceptionHandler(SQLSyntaxErrorException.class)
    public ResponseEntity<String> handleSQLSyntaxError(SQLSyntaxErrorException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("SQL syntax error: " + ex.getMessage());
    }

    @ExceptionHandler(QueryTimeoutException.class)
    public ResponseEntity<String> handleQueryTimeout(QueryTimeoutException ex) {
        return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT)
                .body("Database query timed out. Please try again later.");
    }

    @ExceptionHandler(TransactionSystemException.class)
    public ResponseEntity<String> handleTransactionSystem(TransactionSystemException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Transaction failed: " + ex.getMostSpecificCause().getMessage());
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleConstraintViolation(ConstraintViolationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Constraint violation: " + ex.getMessage());
    }

    @ExceptionHandler(DataAccessResourceFailureException.class)
    public ResponseEntity<String> handleDataAccessResourceFailure(DataAccessResourceFailureException ex) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body("Database access failed: " + ex.getMessage());
    }

    @ExceptionHandler(RefreshTokenExpiredException.class)
        public ResponseEntity<String> handleUserAlreadyExists(RefreshTokenExpiredException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        }

    @ExceptionHandler(NonExistantToken.class)
    public ResponseEntity<String> handleTokenDoesntExist(NonExistantToken ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MailException.class)
    public String handleMailException(MailException mx){
        return new String(mx.getMessage());
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<String> handleAuth(AuthenticationException ex){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(NoNutrionPlanException.class)
    public ResponseEntity<String> noPlanToEdit(NoNutrionPlanException ex){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AdminRestrictedException.class)
    public ResponseEntity<String> handleUserTryingAdmin(AdminRestrictedException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(NonExistantSleepLog.class)
    public ResponseEntity<String> handleNonExistantLog(NonExistantSleepLog ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoExistingFoodException.class)
    public ResponseEntity<String> handleNonExistingFood(NoExistingFoodException ex){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException ex){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);
    }

    /*

    tehnicki implementacija refresh tokena moze biti napravljena pomocu hvatanja IoException i gledanja statusa pa slanja
    optimiacija
    --- ali korda design je frontend
    
     */
}
