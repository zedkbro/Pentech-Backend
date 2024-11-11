import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import EducationBranch from './EducationBranch.js';

class EducationProgram extends BaseModel {}

    EducationProgram.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        branchId: { type: DataTypes.UUID, references: { model: EducationBranch, key: 'id' }, allowNull: false },
        programName: { type: DataTypes.TEXT, allowNull: false, trim: true },
        admissionInfo: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
        academicCalendar: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
        news: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
        academicCalendar: { type: DataTypes.TEXT, allowNull: true, trim: true, defaultValue: null },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default EducationProgram;
