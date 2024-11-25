import BaseModel from "../BaseModel.js";
import { DataTypes } from "sequelize";

class Highlight extends BaseModel {}

Highlight.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: { type: DataTypes.TEXT, allowNull: false, trim: true },
  description: { type: DataTypes.TEXT, allowNull: false, trim: true },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    trim: true,
    defaultValue: null,
  },
  trash: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    trim: true,
    defaultValue: false,
  },
});

export default Highlight;
