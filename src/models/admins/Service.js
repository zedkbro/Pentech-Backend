import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import SubService from './SubService.js';

class Service extends BaseModel {}

  Service.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    serviceTitle: { type: DataTypes.TEXT, allowNull: false },
    serviceDescription: { type: DataTypes.TEXT, allowNull: false },
    trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
  }); 

  Service.hasMany(SubService, { as: 'subService', foreignKey: 'serviceId' });
  

export default Service;
