import colors from "colors";
import express from "express";
import morgan from "morgan";
import { db } from "./config/db";
import AuthRouter from "./routes/authRouter";
import BugetRouter from "./routes/budgetRouter";

const app: express.Application = express();

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.bgGreen.black.bold("Database connected"));
  } catch (error) {
    console.log(
      colors.bgRed.black.bold("Error connecting to Database connected")
    );
    process.exit(1);
  }
}

connectDB();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/budgets", BugetRouter);
app.use("/api/auth", AuthRouter);

export default app;
