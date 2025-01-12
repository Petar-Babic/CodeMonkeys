package GymFitnessTrackerApplication.model.dto.response;

public class InfoResponse {
    private float height;
    private float weight;
    private float goalWeight;
    private String activityLevel;

    private String gender;

    public float getHeight() {
        return height;
    }

    public float getWeight() {
        return weight;
    }

    public float getGoalWeight() {
        return goalWeight;
    }

    public String getActivityLevel() {
        return activityLevel;
    }

    public String getGender() {
        return gender;
    }

    public InfoResponse(float height, float weight, float goalWeight, String activityLevel, String gender) {
        this.height = height;
        this.weight = weight;
        this.goalWeight = goalWeight;
        this.activityLevel = activityLevel;
        this.gender = gender;
    }
}
