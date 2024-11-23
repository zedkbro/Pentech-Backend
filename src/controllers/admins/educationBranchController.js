import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import validator from '../../validators/adminValidator.js';
import { EducationBranch, Sector } from '../../models/admins/Associations.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(EducationBranch);

class EducationBranchController extends SuperController {
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


  async getAll(req, res) {
    try {
      const { trash } = req.query;
      let result;
      if (trash === 'true') {
        result = await service.findAllValuePopulatedData(Sector, "sectorData", { trash: true });
      } else {
        result = await service.findAllValuePopulatedData(Sector, "sectorData", { trash: false });
      }
    if (!result) {
        return ResponseHandler.sendUnSuccessResponse(res, 'No data found.');
    } else {
        return ResponseHandler.sendSuccessResponse(res, result);
    }
    } catch (error) {
    ResponseHandler.sendErrorResponse(res, error);
    }
  }
  

}
export default new EducationBranchController(service);
