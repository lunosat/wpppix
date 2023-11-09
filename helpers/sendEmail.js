import nodemailer from 'nodemailer';

const sendMail = async (email) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: 'acesso@codigoslucrativosoficial.fun',
      pass: '#MdB#123',
    },
  });

  const mailOptions = {
    from: 'acesso@codigoslucrativosoficial.fun',
    to: email,
    subject: 'Bem-vindo ao Código Lucrativo',
    text: `Prezado(a) usuário(a),\n\nBem-vindo(a) à plataforma WppPix!\n\n Acesse https://app.pixtube.sitea e utilize o email da compra para começar.\n\nAtenciosamente,\n\nEquipe WppPix`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email enviado: ${info.messageId}`);
  } catch (error) {
    console.error(`Erro ao enviar o email: ${error}`);
  }
};

export default sendMail;