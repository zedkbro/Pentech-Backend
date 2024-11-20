import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class Share extends BaseModel {}

    Share.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        shareValue: { type: DataTypes.TEXT, allowNull: false, trim: true },
        description: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
    });

export default Share;
