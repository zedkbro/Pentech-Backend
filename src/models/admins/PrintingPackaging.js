import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import Sector from './Sector.js';

class PrintingPackaging extends BaseModel {}

    PrintingPackaging.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        sectorId: { type: DataTypes.UUID, references: { model: Sector, key: 'id' }, allowNull: false },
        productServices: { type: DataTypes.TEXT, allowNull: false, trim: true },
        clientPortfolio: { type: DataTypes.TEXT, allowNull: false, trim: true },
        projectExamples: { type: DataTypes.TEXT, allowNull: false, trim: true },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default PrintingPackaging;
