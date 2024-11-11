import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class Subscriber extends BaseModel {}

Subscriber.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
  email: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: true, defaultValue: 'unseen' },
  trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default Subscriber;
