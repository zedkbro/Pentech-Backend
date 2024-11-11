import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import { deleteImage } from '../../utils/unlinkImages.js';
import validator from '../../validators/adminValidator.js';
import moment from 'moment';
import Blog from '../../models/admins/Blog.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(Blog);

class BlogController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  create(req, res) {
    const imageField = "image"; 
    try{
      const { error, value } = validator.validateBlogs(req.body);
      if(error){
        return ResponseHandler.validationErrorResponse( res, error );
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
    const imageField = "image"; 
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

  async getLatest(req, res){
    const orderedBy = 'date';
    try {
      const { trash } = req.query;
      let result;
      if (trash === 'true') {
        result = await service.findLatest({ trash: true }, orderedBy );
      } else {
        result = await service.findLatest({ trash: false }, orderedBy );
      }
      if (!result) {
      return ResponseHandler.sendUnSuccessResponse(res, 'Blog is not found!');
      }else{
        const updatedResult = result.map(item => {
          const formattedDate = moment(item.date).format('MMMM, D, YYYY');
          return { ...item.dataValues, date: formattedDate };
        });
      return ResponseHandler.sendSuccessResponse(res, updatedResult);
      }
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

}
export default new BlogController(service);
