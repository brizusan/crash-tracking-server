import { Request, Response } from "express";
import Expense from "../models/Expense";
export class ExpenseController {
  static getAllExpenses = async (req: Request, res: Response) => {
    const expenses = await Expense.findAll();
    res.status(200).json({ expenses });
  };

  static create = async (req: Request, res: Response) => {
    try {
      const expense = await Expense.create(req.body);
      expense.budgetID = req.budget.id;
      await expense.save();
      res.status(201).json({ message: "Nuevo gasto creado" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear el registro del gasto" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    res.status(200).json({ expense: req.expense });
  };

  static updateById = async (req: Request, res: Response) => {
    req.expense.name = req.body.name;
    req.expense.amount = req.body.amount;
    await req.expense.save();
    res.status(200).json({ message: "Gasto actualizado" });
  };

  static deleteById = async (req: Request, res: Response) => {
    await req.expense.destroy();
    res.status(200).json({ message: "Gasto eliminado" });
  };
}
