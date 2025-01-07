package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.response.EmailResponse;

public interface EmailService {

    //mail bez attachememt
    String sendSimpleMail(EmailResponse details);

    // mail sa necim , nezz kako storeamo pa prazno za sad (testirao samo sa lokalnim datotekama)
    String sendAttachmentMail(EmailResponse details);

    // AKO SE STIGNE DA DODE LJEPSI MAIL
    String sendHTMLMail(EmailResponse details);
}
