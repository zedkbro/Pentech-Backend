import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class Home extends BaseModel {}

Home.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
  heroTitle: { type: DataTypes.TEXT, allowNull: false },
  heroDescription: { type: DataTypes.TEXT, allowNull: false },
  heroImage: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default Home;
