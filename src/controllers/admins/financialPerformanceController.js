import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import validator from '../../validators/adminValidator.js';
import FinancialPerformance from '../../models/admins/FinancialPerformance.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(FinancialPerformance);

class FinancialPerformanceController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  create(req, res) {
    const fileField = "document"; 
    try{
      const { error, value } = validator.validateFinancialPerformance(req.body);
      if(error){
        return ResponseHandler.validationErrorResponse( res, error );
      }
      req.body = value;
      if (req.file && fileField) {
          const uploadedFile = req.file;
          req.body[fileField] = uploadedFile.filename;
      }   
      return super.create(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async updateById(req, res) {
    const fileField = "document"; 
    try{
      if (req.file && fileField) {
          const uploadedFile = req.file;
          req.body[fileField] = uploadedFile.filename;
          const existingData = await service.findById(req.params.id); 
          if (existingData && existingData[fileField]) {
              await deleteImage(existingData[fileField]);
          }
      }   
      return super.updateById(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async deleteById(req, res) {
    const fileField = "document"; 
    try{
        const existingData = await service.findById(req.params.id); 
        if (existingData && existingData[fileField]) {
            await deleteImage(existingData[fileField]);
        }
      return super.deleteById(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  

}
export default new FinancialPerformanceController(service);
