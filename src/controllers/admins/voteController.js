import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import validator from '../../validators/adminValidator.js';
import { ShareHolder, Candidate, Vote } from '../../models/admins/Associations.js'
import AdminService from '../../services/adminService.js';

const service = new AdminService(Vote);

class VoteController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }
  
  create(req, res) {
    try{
      const { error, value } = validator.validateVote(req.body);
      if(error){
        return ResponseHandler.validationErrorResponse( res, error );
      }
      req.body = value;
      return super.create(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

  async getAll(req, res) {  
    try {  
        const { trash } = req.query;  
        const filterOptions = { trash: trash === 'true' };  
        const includeOptions = [  
            {  
                model: ShareHolder,  
                as: 'shareHolderData',  
                required: false,  // LEFT JOIN  
                where: { trash: filterOptions.trash } 
            },  
            {  
                model: Candidate,  
                as: 'candidateData',  
                required: false,  // LEFT JOIN  
                where: { trash: filterOptions.trash } 
            }  
        ];  
        const result = await service.findAllSharePopulatedData(includeOptions, filterOptions);  
        if (!result.length) {  
            return ResponseHandler.sendUnSuccessResponse(res, 'No Votes found!');  
        } else {  
            return ResponseHandler.sendSuccessResponse(res, result );  
        }  
    } catch (error) {  
        return ResponseHandler.sendErrorResponse(res, error);  
    }  
}


}
export default new VoteController(service);
