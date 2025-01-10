package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.response.EmailResponse;
import jakarta.mail.MessagingException;
import org.springframework.scheduling.annotation.Async;

public interface EmailService {

    //mail bez attachememt
    void sendSimpleMail(EmailResponse details);

    // mail sa necim , nezz kako storeamo pa prazno za sad (testirao samo sa lokalnim datotekama)
    String sendAttachmentMail(EmailResponse details);

    // AKO SE STIGNE DA DODE LJEPSI MAIL
    @Async
    void sendHTMLMail(EmailResponse details);
}
