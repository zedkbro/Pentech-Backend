import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import validator from '../../validators/adminValidator.js';
import { deleteImage } from '../../utils/unlinkImages.js';
import helpers from '../../utils/helpers.js';
import { Op, Sequelize } from 'sequelize';
import Product from '../../models/admins/Product.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(Product);

class ProductController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }
  
  create(req, res) {
    const imageField = "productImage"; 
    try{
      const { error, value } = validator.validateProducts(req.body);
      if(error){
        return ResponseHandler.validationErrorResponse( res, error);
      }
      req.body = value;
      if (req.file && imageField) {
          const uploadedFile = req.file;
          req.body[imageField] = uploadedFile.filename;
      } 
      if(req.body.productTitle){     
      req.body.productTitle = helpers.sanitizeTitle(req.body.productTitle);
      }
      return super.create(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async updateById(req, res) {
    const imageField = "productImage"; 
    try{
      if (req.file && imageField) {
          const uploadedFile = req.file;
          req.body[imageField] = uploadedFile.filename;
          const existingData = await service.findById(req.params.id); 
          if (existingData && existingData[imageField]) {
              await deleteImage(existingData[imageField]);
          }
      }  
      if(req.body.productTitle){     
      req.body.productTitle = helpers.sanitizeTitle(req.body.productTitle);
      }
      return super.updateById(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

  async deleteById(req, res) {
    const imageField = "productImage"; 
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
  
  async findProductByTitle(req, res){
    try {
      const titleParams = req.params.title;
      const title = helpers.sanitizeTitle(titleParams);
      const escapedTitle = title.replace(/[()]/g, '\\$&');
      const result = await service.findOne({
        where: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('productTitle')),
          'LIKE',
          `%${escapedTitle.toLowerCase()}%`
        ),
      });
      if (!result) {
        return ResponseHandler.sendUnSuccessResponse(res, 'Product is not found with this title');
        }else{
        return ResponseHandler.sendSuccessResponse(res, result);
        }
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

}

export default new ProductController(service);
