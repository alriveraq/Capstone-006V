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

const enviarCorreoJunta = async (correos, tema, fecha) => {
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

    console.log('enviando correos');
    for (const lote of lotesDeCorreos) {
        const mailOptions = {
            from: userGmail,
            to: "aleparique@gmail.com", // Agrupar los correos en un solo string
            subject: `Nueva Publicación: ${tema}`,
            html: `
                <h1>${tema}</h1>
                <p>${fecha}</p>
            `,
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
