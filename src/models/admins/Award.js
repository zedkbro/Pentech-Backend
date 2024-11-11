import { DataTypes } from 'sequelize';
import BaseModel from '../BaseModel.js';

class Award extends BaseModel {}

    Award.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        title: { type: DataTypes.TEXT, allowNull: false, trim: true },
        awardFrom: { type: DataTypes.TEXT, allowNull: false, trim: true },
        reason: { type: DataTypes.TEXT, allowNull: false, trim: true },
        body: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
        date: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
        image: { type: DataTypes.STRING, allowNull: true, trim: true, defaultValue: null },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default Award;