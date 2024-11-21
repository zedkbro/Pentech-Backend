import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import Admin from './Admin.js';

class Vote extends BaseModel {}

    Vote.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        userId: { type: DataTypes.UUID, references: { model: Admin, key: 'id' }, allowNull: false },
        title: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
        description: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
        voteCount: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
        date: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
        status: { type: DataTypes.INTEGER, allowNull: true, trim: true, defaultValue: 0 },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default Vote;
