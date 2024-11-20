import SuperController from '../superController.js';
import VoteResult from '../../models/admins/VoteResult.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(VoteResult);

class VoteResultController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

}
export default new VoteResultController(service);
