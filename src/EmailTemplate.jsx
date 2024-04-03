function EmailTemplate({ nomeEmpresa, nomeCandidato, emailCandidato, mensagemCandidato }) {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
            </head>
            <body>
                <p>Caro {nomeEmpresa},</p>

                <p>Gostaríamos de informar que um novo candidato se cadastrou com sucesso em nosso sistema.</p>

                <p><strong>Detalhes do candidato:</strong></p>
                <ul>
                    <li><strong>Nome:</strong> {nomeCandidato}</li>
                    <li><strong>E-mail:</strong> {emailCandidato}</li>
                    <li><strong>Mensagem:</strong> {mensagemCandidato}</li>
                </ul>

                <p>Segue anexo curriculo do mesmo.</p>
                <hr />
                <p><em>Este é um e-mail automático. Por favor, não responda a este e-mail.</em></p>
            </body>
        </html>
    );
}

export default EmailTemplate;
