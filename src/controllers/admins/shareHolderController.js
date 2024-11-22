import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import shareHolder from './authController.js';
import ShareHolder from '../../models/admins/ShareHolder.js';
import AdminService from '../../services/adminService.js';
import { Admin, Share } from '../../models/admins/Associations.js';

const service = new AdminService(ShareHolder);

class ShareHolderController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  async create(req, res) {
    try{  
        const shareHolderData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role
        }
        if(req.file){
            shareHolderData.avatar = req.file.filename;
        }
    let response = await shareHolder.registerShareHolder(shareHolderData);
    if(!response || !response.userId){
        return ResponseHandler.sendUnSuccessResponse(res, "Registration Failed!");
    }
    req.body.userId = response.userId;
    return super.create(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async getAll(req, res) {  
    try {  
        // const { trash } = req.query;  
        // let result;  
        // if (trash === 'true') {  
        //     result = await service.findAllSharePopulatedData(Admin, "usedData", { trash: true });
        //     // result = await service.findAllSharePopulatedData(Share, "shareData", { trash: true });
        // } else {  
        //     result = await service.findAllSharePopulatedData(Admin, "usedData", { trash: false });
        //     // result = await service.findAllSharePopulatedData(Share, "shareData", { trash: false });
        // }   
        const { trash } = req.query;  
        const filterOptions = { trash: trash === 'true' };  
        const includeOptions = [
            { model: Admin, required: false },  // LEFT JOIN Admin
            { model: Share, required: false }   // LEFT JOIN Share
        ];
        const result = await service.findAllSharePopulatedData(includeOptions, "usedData", filterOptions);
        if (!result) {  
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
