import SuperController from '../superController.js';
import Share from '../../models/admins/Share.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(Share);

class ShareController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

}
export default new ShareController(service);
