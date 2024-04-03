import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export const MYMail = () => {

    const mailerSend = new MailerSend({
        apiKey: process.env.MAILERSEND_API_KEY,
    });

    const sentFrom = new Sender("you@yourdomain.com", "Your name");

    const recipients = [
        new Recipient("valdemir127@gmail.com", "Valdemir"),
        new Recipient("suporte01@saponto.com.br", "Suporte01")
    ];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("This is a Subject")
        .setHtml("<strong>This is the HTML content</strong>")
        .setText("This is the text content");

    return new Promise((resolve, reject) => {
        mailerSend.email.send(emailParams)
            .then(response => {
                return resolve(response);
            })
            .catch(error => {
                return reject(error);
            });
    })
}
