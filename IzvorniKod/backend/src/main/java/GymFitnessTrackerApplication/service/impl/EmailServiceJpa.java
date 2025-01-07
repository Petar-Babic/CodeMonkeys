package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.model.response.EmailResponse;
import GymFitnessTrackerApplication.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceJpa implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") private String sender;

    public String sendSimpleMail(EmailResponse details){
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(sender);
            message.setTo(details.getRecipient());
            message.setSubject(details.getSubject());
            message.setText(details.getMessage());

            javaMailSender.send(message);
            return "Poslan mail";
    }

    public String sendAttachmentMail(EmailResponse details){
        return "Mail sa attachment";
    }

    public String sendHTMLMail(EmailResponse details){
        return "Mail sa html content";
    }


}
