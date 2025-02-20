import { Request, Response } from "express";
import Budget from "../models/Budget";
import Expense from "../models/Expense";

export class BudgetsController {
  static getAll = async (req: Request, res: Response) => {
    const budgets = await Budget.findAll({
      // TODO: Traer todos los presupuesto por usuario autenticado
      where: { userID: req.user.id },
    });
    res.status(200).json({ budgets });
  };

  static getBudget = async (req: Request, res: Response) => {
    // TODO: Traer presupuesto con los gastos incluidos
    try {
      const budget = await Budget.findByPk(req.budget.id, {
        include: [Expense],
      });

      res.status(200).json({ budget });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los gastos" });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body);
      if (typeof req.user === "object" && req.user.id) {
        budget.userID = req.user.id;
        await budget.save();
        res.status(201).json({ message: "Nuevo presupuesto creado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al crear el registro" });
    }
  };

  static update = async (req: Request, res: Response) => {
    req.budget.name = req.body.name;
    req.budget.amount = req.body.amount;
    await req.budget.save();
    res.status(200).json({ message: "Presupuesto actualizado" });
  };

  static delete = async (req: Request, res: Response) => {
    await req.budget.destroy();
    res.status(200).json({ message: "Presupuesto eliminado" });
  };
}
