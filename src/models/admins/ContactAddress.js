import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import SocialMedia from './SocialMedia.js';

class contactAddress extends BaseModel {}

contactAddress.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
  address: { type: DataTypes.TEXT, allowNull: false },
  mail: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  contactNumber: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  openingHours: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default contactAddress;