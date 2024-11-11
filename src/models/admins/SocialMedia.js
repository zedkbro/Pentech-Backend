import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class SocialMedia extends BaseModel {}

    SocialMedia.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        platform: { type: DataTypes.STRING, allowNull: false },
        link: { type: DataTypes.STRING, allowNull: false },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default SocialMedia;
