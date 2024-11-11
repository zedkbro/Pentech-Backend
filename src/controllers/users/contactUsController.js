import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import ContactUs from "../../models/users/ContactUs.js";
import validator from "../../validators/userValidator.js";
import UserService from "../../services/userService.js";
const service = new UserService(ContactUs);

class ContactUsController extends SuperController {
    constructor(service) {
        super(service);
        this.service = service;  
    }
  
    create(req, res) {
      const message = "Message Successfully sent! ";
      try {
        const { error, value } = validator.validateMessage(req.body);
        if(error){
          return ResponseHandler.validationErrorResponse(res, error);
        }else{
          req.body = value;
          return super.create(req, res, message);
        }
      } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
      }
    }

  }
  
export default new ContactUsController(service);
    
    
    

