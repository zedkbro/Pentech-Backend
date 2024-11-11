import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import { deleteFile } from '../../utils/unlinkFiles.js';
import validator from "../../validators/userValidator.js";
import Application from '../../models/users/Application.js';
import UserService from '../../services/userService.js';

const service = new UserService(Application);

class ApplicationController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  async create(req, res) {
    const message = "Applied Successfully.";
    const imageFields = ["cv", "applicationLetter"];
    const { careerId } = req.params;
    try{
      const { error, value } = validator.validateApplication(req.body);
      if(error){
        return ResponseHandler.validationErrorResponse(res, error);
      }
      const isApplied = await service.findOneByAndTwoFieldNames({ email: value.email }, { careerId: careerId });
      if(isApplied){
        return ResponseHandler.sendUnSuccessResponse(res, "You have already applied to this Job.");
      }
      const cv = req.files['cv'];
      const applicationLetter = req.files['applicationLetter'];
      const filesToValidate = { cv, applicationLetter };
      const validation = validator.validateApplicationFiles(filesToValidate);
      if (validation.error) {
        return ResponseHandler.validationErrorResponse(res, validation.error);
      }

      if ( req.files && imageFields && imageFields.length > 0) {
          const files = imageFields.map(fieldName => req.files[fieldName]);
          files.forEach((file, index) => {
          if (file && file.length > 0) {
            req.body[imageFields[index]] = file[0].filename;
          }
          });
          req.body.careerId = careerId; 
      }
      return super.create(req, res, message);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

  async getApplicants(req, res){
    const { careerId } = req.params;
    try {
      const applicants = await service.findApplicants(careerId)
      if(!applicants){
        return ResponseHandler.sendUnSuccessResponse(res, "Not One Applicants Yet!")
      }else{
        return ResponseHandler.sendSuccessResponse(res, applicants )
      }
    } catch (error) {
      ResponseHandler.sendSuccessResponse(res, error )
    }
  }

  async updateById(req, res) {
    const imageFields = ["cv", "applicationLetter"];
    try{
      if ( req.files && imageFields && imageFields.length > 0) {
          const files = imageFields.map(fieldName => req.files[fieldName]);
          files.forEach((file, index) => {
          if (file && file.length > 0) {
            req.body[imageFields[index]] = file[0].filename;
          }
          });

          const existingData = await service.findById(req.params.id);
          if (existingData) {
              imageFields.forEach(fieldName => {
                  if (existingData[fieldName]) {
                    deleteFile(existingData[fieldName]);
                  }
              });
          }
      }
      return super.updateById(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

  async deleteById(req, res) {
    const imageFields = ["cv", "applicationLetter"]; 
    try{
      const existingData = await service.findById(req.params.id);
      if (existingData) {
        imageFields.forEach(fieldName => {
            if (existingData[fieldName]) {
                deleteFile(existingData[fieldName]);
            }
        });
      }
      return super.deleteById(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

}

export default new ApplicationController(service);
