import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class Admin extends BaseModel {}

Admin.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
  name: { type: DataTypes.STRING, allowNull: false, trim: true },
  email: { type: DataTypes.STRING, allowNull: false, trim: true, unique: true, lowercase: true, validate: { notEmpty: true } },
  password: { type: DataTypes.STRING, allowNull: false, trim: true, validate: { notEmpty: true } }, 
  phoneNumber: { type: DataTypes.STRING, allowNull: false, trim: true, unique: true, validate: { notEmpty: true } },
  role: { type: DataTypes.STRING, allowNull: false, trim: true, validate: { isIn: [['admin', 'shareholder']], notEmpty: true } },
  avatar: { type: DataTypes.STRING, allowNull: true, trim: true, defaultValue: null },
  trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default Admin;
