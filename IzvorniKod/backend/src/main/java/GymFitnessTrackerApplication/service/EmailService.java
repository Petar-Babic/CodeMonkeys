package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.response.EmailResponse;
import jakarta.mail.MessagingException;

public interface EmailService {

    //mail bez attachememt
    void sendSimpleMail(EmailResponse details);

    // mail sa necim , nezz kako storeamo pa prazno za sad (testirao samo sa lokalnim datotekama)
    String sendAttachmentMail(EmailResponse details);

    // AKO SE STIGNE DA DODE LJEPSI MAIL
    void sendHTMLMail(EmailResponse details);
}
