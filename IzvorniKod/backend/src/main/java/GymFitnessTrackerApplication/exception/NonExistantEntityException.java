package GymFitnessTrackerApplication.exception;

public class NonExistantEntityException extends RuntimeException {
    public NonExistantEntityException(String message) {
        super(message);
    }
}
