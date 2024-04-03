import express from "express"
import { json } from "express"
import multer from "multer"
import cors from "cors"
import { MailerSend, EmailParams, Sender, Recipient, Attachment } from "mailersend"
import EmailTemplate from './EmailTemplate'

const app = express();
const upload = multer();

app.use(cors());
app.use(json());

app.get('/', (req, res, next) => {
    res.json({ message: "Tudo ok por aqui!" });
})

app.post('/api/candidato', upload.single('anexo'), (req, res, next) => {

    // const nome = req.body.nome
    // const email = req.body.email
    // const mensagem = req.body.mensagem

    const {nome, email, mensagem} = req.body

    const candidato = {
        nome: 'João Silva',
        email: 'joao@example.com',
        mensagem: 'Estou interessado na posição disponível...'
    }

    const htmlEmail = ReactDOMServer.renderToString(
        <EmailTemplate
            nomeEmpresa="Empresa XYZ"
            nomeCandidato={candidato.nome}
            emailCandidato={candidato.email}
            mensagemCandidato={candidato.mensagem}
        />
    );

    const mailerSend = new MailerSend({
        apiKey: process.env.MAILERSEND_API_KEY,
    });

    const sentFrom = new Sender("noreply@trial-0p7kx4xqoeeg9yjr.mlsender.net", "PI Univesp 2024 Grupo 13");

    const recipients = [
        new Recipient("valdemir127@gmail.com", "Valdemir")
    ];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("Recebimento de CV")
        .setHtml("<strong>This is the HTML content</strong>")
        .setText("This is the text content");

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

    // mailerSend.email.send(emailParams)
    //     .then(response => {
    //         res.json(response);
    //     })
    //     .catch(error => {
    //         res.json(error);
    //     });
})

app.listen(3030, () => console.log("Servidor escutando na porta 3030..."));