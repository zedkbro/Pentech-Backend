import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import contactAddress from '../../models/admins/ContactAddress.js';
import SocialMedia from '../../models/admins/SocialMedia.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(contactAddress);

class contactAddressController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

}

export default new contactAddressController(service);
