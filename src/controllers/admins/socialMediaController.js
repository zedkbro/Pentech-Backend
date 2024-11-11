import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import SocialMedia from '../../models/admins/SocialMedia.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(SocialMedia);

class SocialMediaController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  create(req, res) {
      const message = "Social Media Added Successfully!";
      try{
          return super.create(req, res, message);
      } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
      }
  }

}

export default new SocialMediaController(service);
