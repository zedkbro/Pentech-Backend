import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import shareHolder from './authController.js';
import ShareHolder from '../../models/admins/ShareHolder.js';
import AdminService from '../../services/adminService.js';
import Admin from '../../models/admins/Admin.js';

const service = new AdminService(ShareHolder);

class ShareHolderController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  async create(req, res) {
    try{  
    let response = await shareHolder.registerShareHolder(req.body);
    if(!response || !response.userId){
        return ResponseHandler.sendUnSuccessResponse(res, "Registration Failed!");
    }
    req.body.userId = response.userId;
    return super.create(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async findAll(req, res) {  
    try {  
        const { trash } = req.query;  
        let result;  
        const includeOptions = [  
            {  
                model: Admin,  
                required: false, // Use `true` for INNER JOIN, `false` for LEFT JOIN  
            },  
            {  
                model: Share,  
                required: false, // Use `true` for INNER JOIN, `false` for LEFT JOIN  
            }  
        ];  
        if (trash === 'true') {  
            result = await ShareHolder.findAll({  
                where: { trash: true },  
                include: includeOptions  
            });  
        } else {  
            result = await ShareHolder.findAll({  
                where: { trash: false },  
                include: includeOptions  
            });  
        }  
        if (!result || result.length === 0) {  
            return ResponseHandler.sendUnSuccessResponse(res, 'No ShareHolder found!');  
        } else {  
            return ResponseHandler.sendSuccessResponse(res, result);  
        }  
    } catch (error) {  
        return ResponseHandler.sendErrorResponse(res, error);  
    }  
}  
  
  

}

export default new ShareHolderController(service);
