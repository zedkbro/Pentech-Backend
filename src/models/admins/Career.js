import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class Career extends BaseModel {}

Career.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
  jobTitle: { type: DataTypes.TEXT, allowNull: false },
  vacancyNumber: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  employmentType: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  responsiblity: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  qualification: { type: DataTypes.TEXT, allowNull: false },
  experience: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  salary: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  workPlace: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  description: { type: DataTypes.TEXT, allowNull: false },
  deadline: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: true, defaultValue: 'opened' },
  trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default Career;