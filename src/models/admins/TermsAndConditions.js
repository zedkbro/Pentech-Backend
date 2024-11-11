import BaseModel from "../BaseModel.js";

import { DataTypes } from "sequelize";

class TermsAndConditions extends BaseModel {}

TermsAndConditions.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
  title: { type: DataTypes.TEXT, allowNull: false, trim:true },
  terms: { type: DataTypes.TEXT, allowNull: false, trim:true },
  trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default TermsAndConditions;
