import { Model } from 'sequelize';
import sequelize from '../config/database.js'; 

class BaseModel extends Model {
  static init(schema) {
    const modelName = this.name;
    return super.init(schema, {
      sequelize,
      modelName,
      timestamps: true
    });
  }
}

export default BaseModel;
