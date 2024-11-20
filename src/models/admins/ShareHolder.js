import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import Admin from './Admin.js';
import Share from './Share.js';

class ShareHolder extends BaseModel {}

    ShareHolder.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        userId: { type: DataTypes.UUID, references: { model: Admin, key: 'id' }, allowNull: false },
        shareId: { type: DataTypes.UUID, references: { model: Share, key: 'id' }, allowNull: false },
        entityType: { type: DataTypes.TEXT, allowNull: false, trim: true },
        nationality: { type: DataTypes.TEXT, allowNull: false, trim: true },
        city: { type: DataTypes.TEXT, allowNull: false, trim: true },
        country: { type: DataTypes.TEXT, allowNull: false, trim: true },
        city: { type: DataTypes.TEXT, allowNull: false, trim: true },
        totalShares: { type: DataTypes.NUMBER, allowNull: false, trim: true, defaultValue: 1 },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default ShareHolder;
