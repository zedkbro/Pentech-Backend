import SuperService from './superService.js'; 
import { Op } from 'sequelize';

class AdminService extends SuperService {
    constructor(model) {
        super(model);
    }

    async checkEmailOrPhone(phone, email) {
      let finalCondition = {};
      if (email && phone) {
        finalCondition = { [Op.or]: { email: email, phoneNumber: phone } };
      } else if (email) {
        finalCondition = { email: email };
      } else if (phone) {
        finalCondition = { phoneNumber: phone };
      }
    
      return await this.model.findOne({ where: finalCondition });
    }

    async findProfileById(id) {
      return await this.model.findByPk(id, { attributes: { exclude: 'password' } });
    }

    
  async checkEmailOrPhoneToUpdate(field1, field2) {
    const finalCondition = { [Op.and]: [field1, field2] };
    return await this.model.findOne({ where: finalCondition });
  }
    
}


export default AdminService;
