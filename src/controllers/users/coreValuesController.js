import SuperController from "../superController.js";
import ResponseHandler from "../responseHandlerController.js";
import { deleteImage } from "../../utils/unlinkImages.js";
import validator from "../../validators/userValidator.js";
import CoreValues from "../../models/users/CoreValues.js";
import UserService from "../../services/userService.js";

const service = new UserService(CoreValues);

class CoreValue extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  create(req, res) {
    const imageField = "image";
    try {
      const { error, value } = validator.validateCoreValues(req.body);
      if (error) {
        return ResponseHandler.validationErrorResponse(res, error);
      }
      req.body = value;
      if (req.file && imageField) {
        const uploadedFile = req.file;
        req.body[imageField] = uploadedFile.filename;
      }
      return super.create(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

  async updateById(req, res) {
    const imageField = "image";
    try {
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
    const imageField = "image";
    try {
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

export default new CoreValue(service);
