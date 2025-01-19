package GymFitnessTrackerApplication.exception;

public class AdminRestrictedException extends  RuntimeException{
    public AdminRestrictedException(String message){
        super(message);
    }
}
