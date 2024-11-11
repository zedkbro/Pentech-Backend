import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import Career from '../admins/Career.js';

class Application extends BaseModel {}

Application.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    fullName: { type: DataTypes.STRING, allowNull: false, trim: true },
    email: { type: DataTypes.STRING, allowNull: false, trim: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: false, trim: true },
    cv: { type: DataTypes.STRING, allowNull: false, trim: true },
    applicationLetter: { type: DataTypes.STRING, allowNull: false, trim: true },
    trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
  }
);
Application.belongsTo(Career, {
  foreignKey: {
    name: 'careerId',
    allowNull: false
  }
});

export default Application;
