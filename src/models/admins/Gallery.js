import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class Gallery extends BaseModel {}

Gallery.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
  title: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
  description: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
  gallery: { type: DataTypes.STRING, allowNull: false, trim: true },
  trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default Gallery;
