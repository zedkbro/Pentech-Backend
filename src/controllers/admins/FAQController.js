import SuperController from '../superController.js';
import FAQ from '../../models/admins/FAQ.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(FAQ);

class FAQController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }
}

export default new FAQController(service);
