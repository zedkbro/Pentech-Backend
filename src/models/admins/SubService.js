import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import Service from './Service.js';

class SubService extends BaseModel {}

    SubService.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        subServiceTitle: { type: DataTypes.TEXT, allowNull: false },
        subServiceDescription: { type: DataTypes.TEXT, allowNull: false },
        subServiceImage: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        serviceId: { type: DataTypes.UUID, allowNull: false },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    }); 
    // SubService.belongsTo(Service, {
    //   foreignKey: {
    //     name: 'serviceId',
    //     allowNull: false
    //   }
    // });

export default SubService;
