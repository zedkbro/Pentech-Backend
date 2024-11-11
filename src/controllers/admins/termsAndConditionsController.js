import SuperController from "../superController.js";
import ResponseHandler from "../responseHandlerController.js";
import validator from "../../validators/adminValidator.js";
import TermsAndConditions from "../../models/admins/TermsAndConditions.js";
import AdminService from "../../services/adminService.js";

const service = new AdminService(TermsAndConditions);

class TermsAndConditionsController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }
  create(req, res) {
    try {
      const { value, error } = validator.validateTermsAndConditions(req.body);
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

export default new TermsAndConditionsController(service);
