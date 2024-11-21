import SuperController from '../superController.js';
import VoteJoined from '../../models/admins/VoteJoined.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(VoteJoined);

class VoteJoinedController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

}
export default new VoteJoinedController(service);
