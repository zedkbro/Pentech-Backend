import SuperController from '../superController.js';
import Candidate from '../../models/admins/Candidate.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(Candidate);

class CandidateController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

}
export default new CandidateController(service);
