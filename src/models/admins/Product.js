import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class Product extends BaseModel {}

Product.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
  productTitle: { type: DataTypes.TEXT, allowNull: false, trim: true },
  productDescription: { type: DataTypes.TEXT, allowNull: false, trim: true },
  productImage: { type: DataTypes.STRING, allowNull: true, trim: true, defaultValue: null },
  trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default Product;
