import SuperController from '../superController.js';
import VotingRight from '../../models/admins/VotingRight.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(VotingRight);

class VotingRightController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

}
export default new VotingRightController(service);
