import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class VoteRight extends BaseModel {}    

    VoteRight.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        title: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
        description: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default VoteRight;
