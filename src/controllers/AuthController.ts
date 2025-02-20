import { Request, Response } from "express";
import { AuthEmail } from "../emails/AuthEmail";
import User from "../models/User";
import { comparePassword, generateToken, hassPassword } from "../utils";
import { generateJWT } from "../utils/jwt";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { name, password, email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        res
          .status(400)
          .json({ message: "Tenemos un usuario asociado a este email" });
        return;
      }
      const passwordValidate = await hassPassword(password);
      const token = generateToken();
      await User.create({ name, password: passwordValidate, email, token });
      await AuthEmail.sendConfirmEmail({ name, email, token });
      res
        .status(201)
        .json({ message: "Nuevo usuario creado , revisa tu correo" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear el registro" });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.params;
    try {
      const user = await User.findOne({ where: { token } });
      if (!user) {
        res.status(401).json({ message: "Token no valido" });
        return;
      }
      user.token = null;
      user.confirmed = true;
      await user.save();
      res.status(200).json({ message: "Cuenta confirmada" });
    } catch (error) {
      res.status(500).json({ message: "Error al realizar la peticion" });
    }
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        res
          .status(401)
          .json({ message: "Credenciales no validas , email incorrecto" });
        return;
      }

      if (!user.confirmed) {
        res.status(403).json({ message: "Cuenta no confirmada" });
        return;
      }

      const validatePassword = await comparePassword(password, user.password);
      if (!validatePassword) {
        res
          .status(401)
          .json({ message: "Credenciales no validas , password incorrecto" });
        return;
      }

      // TODO: generar token JWT y devolverlo
      const userJWT = generateJWT({ id: user.id, email: user.email });
      res.status(200).json({ message: "Credenciales validas", token: userJWT });
    } catch (error) {}
  };

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res
          .status(404)
          .json({ message: "No tenemos registro asociado a este email" });
        return;
      }

      const token = generateToken();
      user.token = token;
      await user.save();
      await AuthEmail.sendResetPasswordEmail({ name: user.name, email, token });
      res
        .status(200)
        .json({ message: "Revisa tu correo para restablecer tu password" });
    } catch (error) {
      res.status(500).json({ message: "Error al realizar la peticion" });
    }
  };

  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body;
    try {
      const tokenExist = await User.findOne({ where: { token } });
      if (!tokenExist) {
        res.status(404).json({ message: "Token no valido" });
        return;
      }
      res.status(200).json({ message: "Token validado" });
    } catch (error) {
      res.status(500).json({ message: "Error al realizar la peticion" });
    }
  };

  static resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
      const user = await User.findOne({ where: { token } });
      if (!user) {
        res.status(404).json({ message: "Token no valido" });
        return;
      }

      user.token = null;
      user.password = await hassPassword(password);
      await user.save();

      res.status(200).json({ message: "Password actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar password " });
    }
  };

  static getUser = async (req: Request, res: Response) => {
    res.json({ user: req.user });
  };

  static updatePassword = async (req: Request, res: Response) => {
    const { current_password, new_password } = req.body;
    try {
      if (typeof req.user === "object" && req.user.id) {
        const user = await User.findByPk(req.user.id);

        const validatePassword = await comparePassword(
          current_password,
          user.password
        );
        if (!validatePassword) {
          res.status(401).json({ message: "Contraseña actual incorrecta" });
          return;
        }
        user.password = await hassPassword(new_password);
        await user.save();
        res.status(200).json({ message: "Password actualizado correctamente" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al realizar la peticion" });
    }
  };
}
