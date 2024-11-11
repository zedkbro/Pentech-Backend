import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import Sector from './Sector.js';

class ICTService extends BaseModel {}

    ICTService.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        sectorId: { type: DataTypes.UUID, references: { model: Sector, key: 'id' }, allowNull: false },
        serviceDescription: { type: DataTypes.TEXT, allowNull: false, trim: true },
        technologyDevelopment: { type: DataTypes.TEXT, allowNull: false, trim: true },
        softwareSolutions: { type: DataTypes.TEXT, allowNull: false, trim: true },
        partnerships: { type: DataTypes.TEXT, allowNull: false, trim: true },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default ICTService;
