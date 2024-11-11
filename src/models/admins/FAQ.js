import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class FAQ extends BaseModel {}

FAQ.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
  question: { type: DataTypes.TEXT, allowNull: false, trim: true },
  answer: { type: DataTypes.TEXT, allowNull: false, trim: true },
  trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default FAQ;
