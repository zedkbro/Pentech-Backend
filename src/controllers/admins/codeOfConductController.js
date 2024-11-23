import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import validator from '../../validators/adminValidator.js';
import { deleteFile } from '../../utils/unlinkFiles.js';
import CodeOfConduct from '../../models/admins/CodeOfConduct.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(CodeOfConduct);

class CodeOfConductController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  async create(req, res) {
    // console.log(req.do);
    
    const fileField = "file"; 
    try{
      const { error, value } = validator.validateCodeOfConduct(req.body);
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
    const fileField = "file"; 
    try{
      if (req.file && fileField) {
          const uploadedFile = req.file;
          req.body[fileField] = uploadedFile.filename;
          const existingData = await service.findById(req.params.id); 
          if (existingData && existingData[fileField]) {
              await deleteFile(existingData[fileField]);
          }
      }   
      return super.updateById(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async deleteById(req, res) {
    const fileField = "file"; 
    try{
        const existingData = await service.findById(req.params.id); 
        if (existingData && existingData[fileField]) {
            await deleteFile(existingData[fileField]);
        }
      return super.deleteById(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

}

export default new CodeOfConductController(service);
