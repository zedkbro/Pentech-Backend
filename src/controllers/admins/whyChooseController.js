import SuperController from '../superController.js';
import WhyChoose from '../../models/admins/WhyChoose.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(WhyChoose);

class WhyChooseController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }
}

export default new WhyChooseController(service);
