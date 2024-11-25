import SuperController from "../superController.js";
import ResponseHandler from "../responseHandlerController.js";
import validator from "../../validators/adminValidator.js";
import { deleteImage } from "../../utils/unlinkImages.js";
import Highlight from "../../models/admins/Highlight.js";
import AdminService from "../../services/adminService.js";

const service = new AdminService(Highlight);

class HighlightController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  create(req, res) {
    const imageField = "image";
    try {
      const { error, value } = validator.validateHighlight(req.body);
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
    const imageField = "avatar";
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
    const imageField = "avatar";
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

export default new HighlightController(service);
