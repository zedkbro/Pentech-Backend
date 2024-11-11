import SuperService from './superService.js'; 

class UserService extends SuperService {
    constructor(model) {
        super(model);
    }
    
    async findApplicants(careerId) {
        return await this.model.findAll({ where: { careerId: careerId } });
      }

}

export default UserService;
