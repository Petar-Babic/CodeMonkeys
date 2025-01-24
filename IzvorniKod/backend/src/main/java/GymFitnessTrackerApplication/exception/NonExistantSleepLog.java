package GymFitnessTrackerApplication.exception;

public class NonExistantSleepLog extends RuntimeException{
    public NonExistantSleepLog(String msg){
        super(msg);
    }
}
