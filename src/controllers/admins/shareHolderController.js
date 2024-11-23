import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import validator from '../../validators/adminValidator.js';
import shareHolder from './authController.js';
import { Admin, ShareHolder, Share } from '../../models/admins/Associations.js';
import AdminService from '../../services/adminService.js';

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
    const { error, value } = validator.validateShareHolder(req.body);
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
                    model: Admin,  
                    as: 'userData',  
                    required: false,  // LEFT JOIN  
                    where: { trash: filterOptions.trash } 
                },  
                {  
                    model: Share,  
                    as: 'shareData',  
                    required: false,  // LEFT JOIN  
                    where: { trash: filterOptions.trash } 
                }  
            ];  
            const result = await service.findAllSharePopulatedData(includeOptions, filterOptions);  
            if (!result.length) {  
                return ResponseHandler.sendUnSuccessResponse(res, 'No ShareHolder found!');  
            } else {  
                return ResponseHandler.sendSuccessResponse(res, result );  
            }  
        } catch (error) {  
            return ResponseHandler.sendErrorResponse(res, error);  
        }  
    }
    
    async deleteById(req, res) {
        try {
          const { id } = req.params;
          const shareHolder = await ShareHolder.findOne({ where: { id } });
          if (!shareHolder) {
            return ResponseHandler.sendUnSuccessResponse(res, 'ShareHolder not found');
          }
          const adminId = shareHolder.userId;
          await shareHolder.destroy();
          if (adminId) {
            await Admin.destroy({ where: { id: adminId } });
          }
          ResponseHandler.sendSuccessResponse(res, null, "Data Deleted Successfully");
        } catch (error) {
          ResponseHandler.sendErrorResponse(res, error);
        }
      }


    }      


export default new ShareHolderController(service);
