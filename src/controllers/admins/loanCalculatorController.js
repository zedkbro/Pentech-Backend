import SuperController from "../superController.js";
import LoanCalculator from "../../models/admins/LoanCalculator.js";
import ResponseHandler from "../responseHandlerController.js";
import validator from "../../validators/adminValidator.js";
import AdminService from "../../services/adminService.js";

const service = new AdminService(LoanCalculator);

class LoanCalculatorController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  create(req, res) {
    try {
      const { value, error } = validator.validateLoanCalculator(req.body);
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

export default new LoanCalculatorController(service);
