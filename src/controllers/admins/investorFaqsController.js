import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import validator from '../../validators/adminValidator.js';
import InvestorFaqs from '../../models/admins/InvestorFaqs.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(InvestorFaqs);

class InvestorFaqsController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

//   create(req, res) {
//     try{
//       const { error, value } = validator.validateBlogs(req.body);
//       if(error){
//         return ResponseHandler.validationErrorResponse( res, error );
//       }
//       req.body = value;
//       return super.create(req, res);
//     } catch (error) {
//       ResponseHandler.sendErrorResponse(res, error);
//     }
//   }
  

}
export default new InvestorFaqsController(service);
