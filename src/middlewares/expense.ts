import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import Expense from "../models/Expense";

declare global {
  namespace Express {
    interface Request {
      expense: Expense;
    }
  }
}

export const validateExpenseID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("expenseId")
    .isInt()
    .withMessage("ID no valido")
    .custom((value) => value > 0)
    .withMessage("ID no valido")
    .run(req);

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const validateExpenseExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { expenseId } = req.params;

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }

    req.expense = expense;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error al realizar la peticion" });
    return;
  }
};

export const validateExpenseInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("name")
    .trim()
    .notEmpty()
    .withMessage("El campo nombre es requerido")
    .run(req);
  await body("amount")
    .notEmpty()
    .withMessage("La cantidad del gasto es obligatoria")
    .isNumeric()
    .withMessage("Gasto no válido , debe ser un número")
    .custom((value) => value > 0)
    .withMessage("La cantidad del gasto debe ser mayor a 0")
    .run(req);
  next();
};
