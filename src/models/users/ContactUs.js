import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class ContactUs extends BaseModel {}

ContactUs.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
  fullName: { type: DataTypes.STRING, allowNull: false, trim: true },
  email: { type: DataTypes.STRING, allowNull: false, trim: true, lowercase: true },
  phoneNumber: { type: DataTypes.STRING, allowNull: true, trim: true, defaultValue: null },
  subject: { type: DataTypes.TEXT, allowNull: false, trim: true },
  message: { type: DataTypes.TEXT, allowNull: false, trim: true },
  trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default ContactUs;