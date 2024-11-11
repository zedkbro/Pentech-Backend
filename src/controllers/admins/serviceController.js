import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import validator from '../../validators/adminValidator.js';
import helpers from '../../utils/helpers.js';
import { Op, Sequelize } from 'sequelize';
import Service from '../../models/admins/Service.js';
import AdminService from '../../services/adminService.js';
import SubService from '../../models/admins/SubService.js';

const service = new AdminService(Service);

class ServiceController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  create(req, res) {
    console.log(req.body);
    try{
      const { error, value } = validator.validateServices(req.body);
      if (error) {
        return ResponseHandler.validationErrorResponse(res, error);
      }
      req.body = value;    
      if(req.body.serviceTitle){     
      req.body.serviceTitle = helpers.sanitizeTitle(req.body.serviceTitle);
      }
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
  
  async updateById(req, res) {
    try{    
      if(req.body.serviceTitle){     
      req.body.serviceTitle = helpers.sanitizeTitle(req.body.serviceTitle);
      }
      return super.updateById(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

  async findServiceByTitle(req, res){
    try {
      const titleParams = req.params.title;
      const title = helpers.sanitizeTitle(titleParams);
      const escapedTitle = title.replace(/[()]/g, '\\$&');
      const result = await service.findOne({
        where: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('serviceTitle')),
          'LIKE',
          `%${escapedTitle.toLowerCase()}%`
        )
      });
      if (!result) {
        return ResponseHandler.sendUnSuccessResponse(res, 'Service is not found with this title');
        }else{
        return ResponseHandler.sendSuccessResponse(res, result);
        }
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

}

export default new ServiceController(service);
