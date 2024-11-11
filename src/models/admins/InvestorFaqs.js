import { DataTypes } from 'sequelize';
import BaseModel from '../BaseModel.js';

class InvestorFaqs extends BaseModel {}

    InvestorFaqs.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        question: { type: DataTypes.TEXT, allowNull: false, trim: true },
        answer: { type: DataTypes.TEXT, allowNull: false, trim: true },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default InvestorFaqs;