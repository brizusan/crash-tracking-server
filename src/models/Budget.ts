import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import Expense from "./Expense";
import User from "./User";

@Table({
  tableName: "budget",
  timestamps: false,
})
class Budget extends Model<Budget> {
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

  // Relaciones de uno a muchos
  @HasMany(() => Expense, {
    foreignKey: "budgetID",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  declare expenses: Expense[];

  @ForeignKey(() => User)
  declare userID: number;
  // // relacion de muchos a uno
  @BelongsTo(() => User)
  declare user: User;
}

export default Budget;
