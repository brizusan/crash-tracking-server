import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { decodedToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authValidateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    res.status(401).json({ message: "No autorizado" });
    return;
  }

  const token = bearerHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "token no valido" });
    return;
  }

  try {
    const userJWT = decodedToken(token);

    if (typeof userJWT === "object" && userJWT.id) {
      const user = await User.findByPk(userJWT.id, {
        attributes: { exclude: ["password", "token", "confirmed"] },
      });
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "token no valido" });
  }
};
