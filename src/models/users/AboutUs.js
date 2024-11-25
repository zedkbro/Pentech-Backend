import BaseModel from "../BaseModel.js";
import { DataTypes } from "sequelize";

class AboutUs extends BaseModel {}

AboutUs.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  background: { type: DataTypes.TEXT, allowNull: false, trim: true },
  mission: { type: DataTypes.TEXT, allowNull: false, trim: true },
  vision: { type: DataTypes.TEXT, allowNull: false, trim: true },
  values: { type: DataTypes.TEXT, allowNull: false, trim: true },
  trash: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    trim: true,
    defaultValue: false,
  },
});

export default AboutUs;
