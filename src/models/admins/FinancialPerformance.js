import { DataTypes } from 'sequelize';
import BaseModel from '../BaseModel.js';

class FinancialPerformance extends BaseModel {}

    FinancialPerformance.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        reportYear: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
        reportType: { type: DataTypes.STRING, allowNull: false, trim: true, validate: { isIn: ['Annual', 'Quarterly'], notEmpty: true } }, 
        description: { type: DataTypes.TEXT, allowNull: false, trim: true },
        document: { type: DataTypes.STRING, allowNull: true, trim: true, defaultValue: null },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default FinancialPerformance;