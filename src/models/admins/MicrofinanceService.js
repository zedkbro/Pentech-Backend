import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import Sector from './Sector.js';

class MicrofinanceService extends BaseModel {}

    MicrofinanceService.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        sectorId: { type: DataTypes.UUID, references: { model: Sector, key: 'id' }, allowNull: false },
        loanProducts: { type: DataTypes.TEXT, allowNull: false, trim: true },
        eligiblityCriteria: { type: DataTypes.TEXT, allowNull: false, trim: true },
        applicationProcedures: { type: DataTypes.TEXT, allowNull: false, trim: true },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default MicrofinanceService;
