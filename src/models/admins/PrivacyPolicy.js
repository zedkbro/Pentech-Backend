import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class PrivacyPolicy extends BaseModel {}

  PrivacyPolicy.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    title: { type: DataTypes.TEXT, allowNull: false },
    policy: { type: DataTypes.TEXT, allowNull: false },
    trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
  });

export default PrivacyPolicy;
