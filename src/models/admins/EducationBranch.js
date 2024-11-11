import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import Sector from './Sector.js';

class EducationBranch extends BaseModel {}

    EducationBranch.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        sectorId: { type: DataTypes.UUID, references: { model: Sector, key: 'id' }, allowNull: false },
        name: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default EducationBranch;
