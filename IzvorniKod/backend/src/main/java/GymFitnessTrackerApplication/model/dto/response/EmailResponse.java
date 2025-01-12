package GymFitnessTrackerApplication.model.dto.response;

public class EmailResponse {
    private String recipient;
    private String subject;
    private String message;
    private String attachment;

    public EmailResponse(){}

    public EmailResponse(String recipient, String subject, String message, String attachment) {
        this.recipient = recipient;
        this.subject = subject;
        this.message = message;
        this.attachment = attachment;
    }

    public String getRecipient() {
        return recipient;
    }

    public String getSubject() {
        return subject;
    }

    public String getMessage() {
        return message;
    }

    public String getAttachment() {
        return attachment;
    }
}
