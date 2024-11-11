import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import validator from '../../validators/adminValidator.js';
import { deleteImage } from '../../utils/unlinkImages.js';
import Video from '../../models/admins/Video.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(Video);

class VideoController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  create(req, res) {
    const videoField = "video"; 
    try{
      if (req.file) {
      // const { error, value } = validator.validateVideos(req.file);
      // if (error) {
      //   return ResponseHandler.validationErrorResponse(res, error);
      // }
      const uploadedFile = req.file;
      req.body[videoField] = uploadedFile.filename;
      }else{
        return ResponseHandler.sendUnSuccessResponse(res, "You haven't Choosen any Video file!");
      }
      return super.create(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

  async updateById(req, res) {
    const imageField = "video"; 
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
    const imageField = "video"; 
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

export default new VideoController(service);
