const nodemailer = require('nodemailer');

const userGmail = "aleriveque@gmail.com";
const passAppGmail = "pgcrmymofnikkxdr"; // Asegúrate de usar la contraseña de la app

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: userGmail,
        pass: passAppGmail,
    },
});

// Función para validar correos
const esCorreoValido = correo => {
    const re = /\S+@\S+\.\S+/;
    return re.test(correo);
};

const enviarCorreoJunta = async (correos, titulo, contenido, imagenBuffer) => {
    // Limpia la lista de correos
    const correosLimpios = correos
        .map(correo => correo.trim())
        .filter(correo => correo !== '' && esCorreoValido(correo));

    console.log('Enviando correos a:', correosLimpios.join(', ')); // Verificar la lista de correos

    // Dividir los correos en lotes de 3
    const lotesDeCorreos = [];
    for (let i = 0; i < correosLimpios.length; i += 3) {
        lotesDeCorreos.push(correosLimpios.slice(i, i + 3));
    }

    // Enviar correo a cada lote de destinatarios
    for (const lote of lotesDeCorreos) {
        const mailOptions = {
            from: userGmail,
            to: lote.join(', '), // Agrupar los correos en un solo string
            subject: `Nueva Publicación: ${titulo}`,
            html: `
                <h1>${titulo}</h1>
                <p>${contenido}</p>
                <img src="cid:imagen" alt="Imagen de la publicación" />
            `,
            attachments: [
                {
                    filename: 'imagen.png',
                    content: imagenBuffer,
                    contentType: 'image/png',
                    cid: 'imagen' // Este CID se usará en el src del img
                }
            ]
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`Correo enviado a: ${lote.join(', ')}`);
        } catch (error) {
            console.error(`Error al enviar correo a ${lote.join(', ')}:`, error.message);
        }
    }
};

module.exports = { enviarCorreoJunta };
