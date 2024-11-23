import BaseModel from "../BaseModel.js";
import { DataTypes } from "sequelize";

class CodeOfConduct extends BaseModel {}
<<<<<<< HEAD
CodeOfConduct.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: true,
    trim: true,
    defaultValue: null,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    trim: true,
    defaultValue: null,
  },
  // file: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  trash: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    trim: true,
    defaultValue: false,
  },
});
=======

    CodeOfConduct.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        title: { type: DataTypes.TEXT, allowNull: false, trim: true },
        description: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
        file: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });
>>>>>>> d3aa980fbd0b19e40248f2b5ccb01dbdf1c1e41e

    
export default CodeOfConduct;
