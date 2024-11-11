import SuperController from "../superController.js";
import ResponseHandler from "../responseHandlerController.js";
import validator from "../../validators/adminValidator.js";
import PrivacyPolicy from "../../models/admins/PrivacyPolicy.js";
import AdminService from "../../services/adminService.js";

const service = new AdminService(PrivacyPolicy);

class PrivacyPolicyController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  create(req, res) {
    try {
      const { error, value } = validator.validatePrivacyPolicy(req.body);
      if (error) {
        return ResponseHandler.validationErrorResponse(res, error);
      }
      req.body = value;
      return super.create(req, res);
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error);
    }
  }
}

export default new PrivacyPolicyController(service);
