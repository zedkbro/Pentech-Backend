import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import helpers from '../../utils/helpers.js';
import { Op, Sequelize } from 'sequelize';
import shareHolder from './authController.js';
import ShareHolder from '../../models/admins/ShareHolder.js';
import AdminService from '../../services/adminService.js';
import SubService from '../../models/admins/SubService.js';

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
  
  async findAll(req, res){
    try {
      const { trash } = req.query;
      let result;
      if (trash === 'true') {
        result = await service.findAllPopulatedDataWithInnerField(
          SubService,
          { trash: true },
          'subService'
      );
      } else {
        result = await service.findAllPopulatedDataWithInnerField(
          SubService,
          { trash: false },
          'subService'
      );
      }
        if (!result) {
        return ResponseHandler.sendUnSuccessResponse(res, 'Service is not found Yet!');
        }else{
        return ResponseHandler.sendSuccessResponse(res, result);
        }
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async getById(req, res){
    try {
      const { id } = req.params;
        const result = await service.findPopulatedDataWithIDAndInnerField(id, SubService, "subService");
        if (!result) {
        return ResponseHandler.sendUnSuccessResponse(res, 'Data not found');
        }else{
        return ResponseHandler.sendSuccessResponse(res, result);
        }
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  

}

export default new ShareHolderController(service);
