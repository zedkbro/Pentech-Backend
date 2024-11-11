import { DataTypes } from "sequelize";
import BaseModel from "../BaseModel.js";

class LoanCalculator extends BaseModel {}

LoanCalculator.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  loanAmount: { type: DataTypes.STRING, allowNull: false, trim: true  },
  interestRate: { type: DataTypes.STRING, allowNull: false, trim: true  },
  loanTerm: { type: DataTypes.TEXT, allowNull: false, trim: true },
  trash: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    trim: true,
    defaultValue: false,
  },
});

export default LoanCalculator;