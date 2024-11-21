import SuperController from '../superController.js';
import VotingSession from '../../models/admins/VotingSession.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(VotingSession);

class VotingSessionController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

}
export default new VotingSessionController(service);
