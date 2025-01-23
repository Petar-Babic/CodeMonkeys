package GymFitnessTrackerApplication.model.dto.response;

public class TrainerDetailsResponse extends UserDetailsResponse {
    private int numberOfClients;

    public TrainerDetailsResponse(){
        super();
    }

    public TrainerDetailsResponse(Long userId,String name,String image,int numberOfClients){
        super(userId,name,image);
        this.numberOfClients = numberOfClients;
    }

    public int getNumberOfClients() {
        return numberOfClients;
    }

    public void setNumberOfClients(int numberOfClients) {
        this.numberOfClients = numberOfClients;
    }
}
