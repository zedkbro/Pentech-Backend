import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class Testimonial extends BaseModel {}

Testimonial.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
  fullName: { type: DataTypes.STRING, allowNull: false, trim: true },
  profession: { type: DataTypes.TEXT, allowNull: false, trim: true },
  description: { type: DataTypes.TEXT, allowNull: false, trim: true },
  avatar: { type: DataTypes.STRING, allowNull: true, trim: true, defaultValue: null },
  trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default Testimonial;
