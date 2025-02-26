import { Router } from "express";
import { body, param } from "express-validator";
import { limiter } from "../config/limiter";
import { AuthController } from "../controllers/AuthController";
import { authValidateJWT } from "../middlewares/auth";
import { validationErrors } from "../middlewares/validation";

const router: Router = Router();

// Middlewares limit de peticiones
router.use(limiter);

router.post(
  "/create-account",
  body("name")
    .notEmpty()
    .withMessage("El campo name es requerido")
    .isLength({ min: 2 })
    .withMessage("El name debe tener al menos 2 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("El campo email es requerido")
    .isEmail()
    .withMessage("Email no valido"),
  body("password")
    .notEmpty()
    .withMessage("El campo password es requerido")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  validationErrors,
  AuthController.createAccount
);

router.post(
  "/confirm-account",
  body("token")
    .notEmpty()
    .withMessage("El token es requerido")
    .isNumeric()
    .withMessage("Token no valido,debe ser un numero")
    .isLength({ max: 6 })
    .withMessage("Token no valido, maximo de 6 digitos"),
  validationErrors,
  AuthController.confirmAccount
);

router.post(
  "/login",
  body("email")
    .notEmpty()
    .withMessage("El campo email es requerido")
    .isEmail()
    .withMessage("Email no valido"),
  body("password").notEmpty().withMessage("El campo password es requerido"),
  validationErrors,
  AuthController.login
);

router.post(
  "/forgot-password",
  body("email")
    .notEmpty()
    .withMessage("El campo email es requerido")
    .isEmail()
    .withMessage("Email no valido"),
  validationErrors,
  AuthController.forgotPassword
);

router.post(
  "/validate-token",
  body("token")
    .notEmpty()
    .withMessage("El token es requerido")
    .isLength({ max: 6 })
    .withMessage("Token no valido, maximo de 6 digitos"),
  validationErrors,
  AuthController.validateToken
);

router.post(
  "/reset-password/:token",
  param("token")
    .notEmpty()
    .withMessage("El token es requerido")
    .isLength({ max: 6 })
    .withMessage("Token no valido, maximo de 6 digitos"),
  body("password")
    .notEmpty()
    .withMessage("El campo password es requerido")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  validationErrors,
  AuthController.resetPassword
);

router.get("/user", authValidateJWT, AuthController.getUser);

router.post(
  "/update-password",
  authValidateJWT,
  body("current_password")
    .notEmpty()
    .withMessage("Contraseña actual es requerida"),
  body("new_password")
    .notEmpty()
    .withMessage("El campo nueva contraseña es requerida")
    .isLength({ min: 8 })
    .withMessage("La nueva contraseña debe tener al menos 8 caracteres"),
  validationErrors,
  AuthController.updatePassword
);

router.post(
  "/check-password",
  authValidateJWT,
  body("password").notEmpty().withMessage("El password no puede ir vacio"),
  validationErrors,
  AuthController.checkPassword
);

// Actualizar informacion de usuario

router.patch(
  "/user",
  authValidateJWT,
  body("name").notEmpty().withMessage("El campo name es obligatorio"),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Email no valido"),
  validationErrors,
  AuthController.updateUser
);

export default router;
