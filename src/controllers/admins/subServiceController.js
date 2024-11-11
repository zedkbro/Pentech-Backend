import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import validator from '../../validators/adminValidator.js';
import { deleteImage } from '../../utils/unlinkImages.js';
import SubService from '../../models/admins/SubService.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(SubService);

class SubServiceController extends SuperController {
    constructor(service) {
        super(service);
        this.service = service;
    } 

    create(req, res) {
        const imageField = "subServiceImage"; 
        const serviceId = req.params.id;
        const message = "Sub Service Added Successfully!";
        try{
            const { error, value } = validator.validateSubServices(req.body);
            if (error) {
              return ResponseHandler.validationErrorResponse(res, error);
            }
            req.body = value;
            req.body.serviceId = serviceId;
            if (req.file && imageField) {
                const uploadedFile = req.file;
                req.body[imageField] = uploadedFile.filename;
            } 
            return super.create(req, res, message);
        } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
        }
    }
    
  async updateById(req, res) {
    const imageField = "serviceImage"; 
    try{
      if (req.file && imageField) {
          const uploadedFile = req.file;
          req.body[imageField] = uploadedFile.filename;
          const existingData = await service.findById(req.params.id); 
          if (existingData && existingData[imageField]) {
              await deleteImage(existingData[imageField]);
          }
      }   
      return super.updateById(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async deleteById(req, res) {
    const imageField = "serviceImage"; 
    try{
        const existingData = await service.findById(req.params.id); 
        if (existingData && existingData[imageField]) {
            await deleteImage(existingData[imageField]);
        }
      return super.deleteById(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
      
}

export default new SubServiceController(service);
