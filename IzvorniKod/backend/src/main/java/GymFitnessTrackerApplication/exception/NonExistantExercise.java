package GymFitnessTrackerApplication.exception;

public class NonExistantExercise extends RuntimeException {
    public NonExistantExercise(String message) {
        super(message);
    }
}
