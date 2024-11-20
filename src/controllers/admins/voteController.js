import SuperController from '../superController.js';
import Vote from '../../models/admins/Vote.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(Vote);

class VoteController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

}
export default new VoteController(service);
