import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import Budget from "./Budget";

@Table({
  tableName: "user",
  timestamps: false,
})
class User extends Model<User> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare password: string;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(100),
  })
  declare email: string;

  @Column({
    type: DataType.STRING(6),
  })
  declare token: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare confirmed: boolean;

  @HasMany(() => Budget)
  declare budgets: Budget[];
}

export default User;
