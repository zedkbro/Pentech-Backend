import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class Partner extends BaseModel {}

Partner.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
  businessName: { type: DataTypes.TEXT, allowNull: false, trim: true },
  email: { type: DataTypes.STRING, allowNull: false, trim: true },
  phoneNumber: { type: DataTypes.STRING, allowNull: false, trim: true },
  logo: { type: DataTypes.STRING, allowNull: true, trim: true, defaultValue: null },
  specializeArea: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
  description: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
  website: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
  status: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
  trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default Partner;
