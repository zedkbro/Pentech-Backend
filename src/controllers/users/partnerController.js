import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import { deleteImage } from '../../utils/unlinkImages.js';
import validator from "../../validators/userValidator.js";
import Partner from '../../models/users/Partner.js';
import UserService from '../../services/userService.js';

const service = new UserService(Partner);

class PartnerController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }
  
  create(req, res) {
    const message = "Joined as Partnership Successfully.";
    const imageField = "logo"; 
    try{
      const { error, value } = validator.validatePartnership(req.body);
      if(error){
        return ResponseHandler.validationErrorResponse(res, error);
      }
      req.body = value;
      if (req.file && imageField) {
          const uploadedFile = req.file;
          req.body[imageField] = uploadedFile.filename;
      }   
      return super.create(req, res, message);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

  async verifyPartnerships(req, res){
    const { partnershipId } = req.params;
    try {
      const verifiedPartnership = await service.updateById(
        partnershipId,  
        { status: 1 }
      );
      if(!verifiedPartnership){
        return ResponseHandler.sendUnSuccessResponse(res, "There is no Parnership to verify!");
      }else{
        return ResponseHandler.sendSuccessResponse(res, verifiedPartnership);
      }
    } catch (error) {
      return ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async getVerifiedPartnerships(req, res){
    try {
      const { trash } = req.query;
      let result;
      if (trash === 'true') {
        result = await service.findAll({ status: 1, trash: true });
      } else {
        result = await service.findAll({ status: 1, trash: false });
      }
      if (!result) {
      return ResponseHandler.sendUnSuccessResponse(res, 'There are no verified partnerships at this moment.');
      }else{
      return ResponseHandler.sendSuccessResponse(res, result);
      }
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async updateById(req, res) {
    const imageField = "logo"; 
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
    const imageField = "logo"; 
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

export default new PartnerController(service);
