import { DataTypes } from "sequelize";
import BaseModel from "../BaseModel.js";

class Statistics extends BaseModel {}

Statistics.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  members: {
    type: DataTypes.DECIMAL,
  },
  loanDistributed: {
    type: DataTypes.DECIMAL,
  },
  memberSavings: {
    type: DataTypes.DECIMAL,
  },
  assets: {
    type: DataTypes.DECIMAL,
  },
  trash: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    trim: true,
    defaultValue: false,
  },
});

export default Statistics;
