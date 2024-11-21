import SuperController from '../superController.js';
import VoteRight from '../../models/admins/VoteResult.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(VoteRight);

class VoteRightController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

}
export default new VoteRightController(service);
