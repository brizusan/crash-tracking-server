import { transporter } from "../config/nodemailer";

type EmailType = {
  name: string;
  email: string;
  token: string;
};

export class AuthEmail {
  static sendConfirmEmail = async (user: EmailType) => {
    const { name, email, token } = user;

    const info = await transporter.sendMail({
      from: "CRASH TRACKER  <admin@crashtraking.email>",
      to: email,
      subject: "Updgrate Account",
      html: `<div
        style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1rem;
          text-align: center;
          padding-block= 1.5rem;
        >
        <h1
          style="
            font-size: 3rem;
            color:rgba(23, 20, 40, 0.87);
            font-family: sans-serif;
            font-weight: 700;
          "
        >UPGRADE ACCOUNT</h1>
        <small
          style="
            color:rgba(184, 183, 191, 0.94);
          "
        >Activar cuenta en Crashing Tracker</small>
        <p>
          Hola ${name},
          <br />
          Te registraste en Crashing Tracker, para activar tu cuenta haz click en el siguiente enlace
          <a
            style="
              color:rgba(47, 26, 206, 0.87);
              font-size: 0.8rem;
              font-family: sans-serif;
            "
            href="http://localhost:4000/confirm-account/${token}"
            target="_blank"
            >Activar Cuenta</a>
        </p>
        <p
          style="
            color:rgba(206, 26, 26, 0.87);
            font-size: 0.8rem;
            font-family: sans-serif;
          "
        >Si no fuiste tu puedes ignorar este correo</p>
        <small
          style="
            color:rgba(206, 26, 26, 0.87);
            font-size: 0.8rem;
            font-family: sans-serif;
          "
        >Gracias por usar Crashing Tracker</small>
      </div>`,
    });

    console.log("Message sent: %s", info.messageId);
  };

  static sendResetPasswordEmail = async (user: EmailType) => {
    const { name, email, token } = user;

    const info = await transporter.sendMail({
      from: "CRASH TRACKER  <admin@crashtraking.email>",
      to: email,
      subject: "Forget Password Account",
      html: `<div
        style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1rem;
          text-align: center;
          padding-block= 1.5rem;
        >
        <h1
          style="
            font-size: 3rem;
            color:rgba(23, 20, 40, 0.87);
            font-family: sans-serif;
            font-weight: 700;
          "
        >Forgot Password | CRASH TRACKER</h1>
        <small
          style="
            color:rgba(184, 183, 191, 0.94);
          "
        >Olvidaste tu contraseña</small>
        <p>
          Hola ${name},
          <br />
          Deseas restablecer tu contraseña, para actualizar tu cuenta haz click en el siguiente enlace
          <a
            style="
              color:rgba(47, 26, 206, 0.87);
              font-size: 0.8rem;
              font-family: sans-serif;
            "
            href="http://localhost:4000/reset-password/${token}"
            target="_blank"
            >Reset Password</a>
        </p>
        <p>Para restablecer tu contraseña ingresa el siguiente codigo ${token}</p>
        <p
          style="
            color:rgba(206, 26, 26, 0.87);
            font-size: 0.8rem;
            font-family: sans-serif;
          "
        >Si no fuiste tu puedes ignorar este correo</p>
        <small
          style="
            color:rgba(206, 26, 26, 0.87);
            font-size: 0.8rem;
            font-family: sans-serif;
          "
        >Gracias por usar Crashing Tracker</small>
      </div>`,
    });

    console.log("Message sent: %s", info.messageId);
  };
}
