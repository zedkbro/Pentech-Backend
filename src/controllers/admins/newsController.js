import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import validator from '../../validators/adminValidator.js';
import { deleteImage } from '../../utils/unlinkImages.js';
import { Op, Sequelize } from 'sequelize';
import moment from 'moment';
import helpers from '../../utils/helpers.js';
import Admin from '../../models/admins/Admin.js';
import News from '../../models/admins/News.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(News);

class NewsController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }
  
  async create(req, res) {
    const { id } = req.user;
    const imageField = "image"; 
    try{
      const { error, value } = validator.validateNews(req.body);
      if(error){
        return ResponseHandler.validationErrorResponse( res, error);
      }
      const publisher = await Admin.findByPk(id);
      if(!publisher){
        return ResponseHandler.sendUnSuccessResponse(res, "You can't Publish News! Login Again to publish.");
      }
      const publisherName = publisher.name;
      req.body = value;
      req.body.publisher = publisherName;
      if (req.file && imageField) {
          const uploadedFile = req.file;
          req.body[imageField] = uploadedFile.filename;
      }    
      if(req.body.title){     
      req.body.title = helpers.sanitizeTitle(req.body.title);
      }
      return super.create(req, res);
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
      return ResponseHandler.sendUnSuccessResponse(res, 'News is not found!');
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
      if(req.body.title){     
      req.body.title = helpers.sanitizeTitle(req.body.title);
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
  
  async findNewsByTitle(req, res){
    try {
      const titleParams = req.params.title;
      const title = helpers.sanitizeTitle(titleParams);
      const escapedTitle = title.replace(/[()]/g, '\\$&');
      const result = await service.findOne({
        where: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('title')),
          'LIKE',
          `%${escapedTitle.toLowerCase()}%`
        )
      });
      if (!result) {
        return ResponseHandler.sendUnSuccessResponse(res, 'News is not found with this title');
        }else{
        return ResponseHandler.sendSuccessResponse(res, result);
        }
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

}

export default new NewsController(service);
