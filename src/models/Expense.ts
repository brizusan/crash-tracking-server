import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Budget from "./Budget";

@Table({
  tableName: "expense",
  timestamps: false,
})
class Expense extends Model<Expense> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  declare amount: number;

  // Llave foranea
  @ForeignKey(() => Budget)
  declare budgetID: number;
  // relacion de muchos a uno
  @BelongsTo(() => Budget)
  declare budget: Budget;
}

export default Expense;
