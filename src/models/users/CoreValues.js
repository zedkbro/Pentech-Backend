import BaseModel from "../BaseModel.js";
import { DataTypes } from "sequelize";

class CoreValue extends BaseModel {}

CoreValue.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  image: { type: DataTypes.TEXT, allowNull: false, trim: true },
  title: { type: DataTypes.TEXT, allowNull: false, trim: true },
  description: { type: DataTypes.TEXT, allowNull: false, trim: true },
  trash: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    trim: true,
    defaultValue: false,
  },
});

export default CoreValue;
