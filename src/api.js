import express from "express"
import { json } from "express"
import multer from "multer"
import cors from "cors"
import { MailerSend, EmailParams, Sender, Recipient, Attachment } from "mailersend"
import fs from "fs"

const app = express();
const upload = multer();
const modelo_email = fs.readFileSync("./src/modelo_email.html", "utf-8")

app.use(cors());
app.use(json());

app.get('/', (req, res, next) => {
    res.json({ message: "Tudo ok por aqui!" });
})

app.post('/api/candidato', upload.single('anexo'), (req, res, next) => {
    const {nome, email, mensagem, mail_to, mail_to_nome} = req.body

    const emailPreenchido = modelo_email
    .replace("[destinatario]", process.env.MAIL_TO_NAME)
    .replace("[nome]", nome)
    .replace("[email]", email)
    .replace("[mensagem]", mensagem)

    const mailerSend = new MailerSend({
        apiKey: process.env.MAILERSEND_API_KEY,
    });

    const emailParams = new EmailParams()
        .setFrom(
            new Sender("noreply@trial-0p7kx4xqoeeg9yjr.mlsender.net", "PI Univesp 2024 Grupo 13")
        )
        .setTo([
            //new Recipient(process.env.MAIL_TO, process.env.MAIL_TO_NAME)
            new Recipient(mail_to, mail_to_nome)
        ])
        .setReplyTo(
            new Sender(email, nome)
        )
        .setSubject("Recebimento de CV")
        .setHtml(emailPreenchido)

    if (req.file) {
        const anexo = req.file;
        const attachments = [
            new Attachment(
                anexo.buffer.toString('base64'),
                anexo.originalname,
                'attachment'
            )
        ]
        emailParams.setAttachments(attachments)
    }

    mailerSend.email.send(emailParams)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json(error);
        });
})

app.listen(
    process.env.PORT || 3333
)