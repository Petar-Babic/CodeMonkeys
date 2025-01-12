package GymFitnessTrackerApplication.service.impl;

import GymFitnessTrackerApplication.model.dto.response.EmailResponse;
import GymFitnessTrackerApplication.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


@Service
public class EmailServiceJpa implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String sender;

    public void sendSimpleMail(EmailResponse details) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(sender);
        message.setTo(details.getRecipient());
        message.setSubject(details.getSubject());
        message.setText(details.getMessage());

        javaMailSender.send(message);
    }

    public String sendAttachmentMail(EmailResponse details) {
        return "Mail sa attachment";
    }

    @Async
    public void sendHTMLMail(EmailResponse details)  {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(new InternetAddress(sender));
            helper.setTo(details.getRecipient());
            helper.setSubject(details.getSubject());

            Context context = new Context();
            String htmlContent = templateEngine.process("signup.html", context);

            helper.setText(htmlContent, true);

            javaMailSender.send(message);

        } catch (MessagingException mx) {
            sendSimpleMail(new EmailResponse(
                    details.getRecipient(),
                    "Registracija na našu platformu",
                    "Hvala vam na prijavi na našu platformu :) \n Sad go for those gains ;) \n",
                    "N/A"
            ));
        }
    }
}
