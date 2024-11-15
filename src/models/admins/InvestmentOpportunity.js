import { DataTypes } from 'sequelize';
import BaseModel from '../BaseModel.js';

class InvestmentOpportunity extends BaseModel {}

    InvestmentOpportunity.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        opportunityTitle: { type: DataTypes.TEXT, allowNull: true, trim: true },
        description: { type: DataTypes.TEXT, allowNull: false, trim: true },
        sharesAvailable: { type: DataTypes.INTEGER, allowNull: false, trim: true }, 
        offeringDate: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default InvestmentOpportunity;