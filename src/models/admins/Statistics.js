import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class Statistics extends BaseModel {}

  Statistics.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        milestone: { type: DataTypes.TEXT, allowNull: false, trim: true },
        total: { type: DataTypes.TEXT, allowNull: false, trim: true },
        description: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default Statistics;
