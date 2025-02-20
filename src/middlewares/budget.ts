import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import Budget from "../models/Budget";

declare global {
  namespace Express {
    interface Request {
      budget: Budget;
    }
  }
}

export const validateBudgetID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("budgetID")
    .isInt()
    .withMessage("ID no valido")
    .custom((value) => value > 0)
    .withMessage("ID no valido")
    .run(req);

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};

export const validateBudgetExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { budgetID } = req.params;
    const budget = await Budget.findByPk(budgetID);

    if (!budget) {
      res.status(404).json({ message: "Budget not found" });
      return;
    }
    req.budget = budget;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error al realizar la peticion" });
    return;
  }
};

export const validateBudgetInput = async (
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
    .withMessage("amount is required")
    .isNumeric()
    .withMessage("amount must be a number")
    .custom((value) => value > 0)
    .withMessage("amount must be greater than 0")
    .run(req);
  next();
};
