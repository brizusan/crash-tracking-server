import { Router } from "express";
import { BudgetsController } from "../controllers/BudgetController";
import { ExpenseController } from "../controllers/ExpenseController";
import { authValidateJWT } from "../middlewares/auth";
import {
  hasValidAccess,
  validateBudgetExist,
  validateBudgetID,
  validateBudgetInput,
} from "../middlewares/budget";
import {
  validateExpenseExist,
  validateExpenseID,
  validateExpenseInput,
} from "../middlewares/expense";
import { validationErrors } from "../middlewares/validation";

const router: Router = Router();

router.use(authValidateJWT);

// Middlewares cada que tengamos un parametro budgetID
router.param("budgetID", validateBudgetID);
router.param("budgetID", validateBudgetExist);
router.param("budgetID", hasValidAccess);

router.param("expenseId", validateExpenseID);
router.param("expenseId", validateExpenseExist);

/** Rutas para el recurso presupuesto */
router
  .route("/")
  .get(BudgetsController.getAll)
  .post(validateBudgetInput, validationErrors, BudgetsController.create);

router
  .route("/:budgetID")
  .get(BudgetsController.getBudget)
  .put(validateBudgetInput, validationErrors, BudgetsController.update)
  .delete(BudgetsController.delete);

/** Rutas para el recurso gasto
 * Patron ROA (REST API) => Arquitetura orientada a recursos
 * GET /budgets/:budgetID/expenses
 * */

router
  .route("/:budgetID/expenses")
  .get(ExpenseController.getAllExpenses)
  .post(validateExpenseInput, validationErrors, ExpenseController.create);

router
  .route("/:budgetID/expenses/:expenseId")
  .get(ExpenseController.getById)
  .put(validateExpenseInput, validationErrors, ExpenseController.updateById)
  .delete(ExpenseController.deleteById);

export default router;
