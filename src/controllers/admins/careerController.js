import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import moment from 'moment';
import helpers from '../../utils/helpers.js';
import { Op, Sequelize } from 'sequelize';
import validator from '../../validators/adminValidator.js';
import Career from '../../models/admins/Career.js';
import AdminService from '../../services/adminService.js';

const service = new AdminService(Career);

class CareerController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }

  create(req, res) {
    try{
      const { error, value } = validator.validateCareers(req.body);
      if (error) {
        return ResponseHandler.validationErrorResponse(res, error);
      }
      req.body = value;   
      if(req.body.jobTitle){     
      req.body.jobTitle = helpers.sanitizeTitle(req.body.jobTitle);
      }
      return super.create(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async updateById(req, res) {
    try{   
      if(req.body.jobTitle){     
      req.body.jobTitle = helpers.sanitizeTitle(req.body.jobTitle);
      }
      return super.updateById(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async getAllOpenedVacancy(req, res) {
    try {
      const { trash } = req.query;
      const currentDate = new Date();
      await service.updateMany(
        { status: 'closed' },
        { deadline: { [Op.lt]: currentDate }, status: 'opened' } 
      );
      let result;
      if (trash === 'true') {
        result = await service.findAllByTwoFieldNames( 
          { deadline: { [Op.gte]: currentDate } },
          { status: 'opened' },
          { trash: true },
          { order: [['createdAt', 'DESC']] }
        );
      } else {
        result = await service.findAllByTwoFieldNames( 
          { deadline: { [Op.gte]: currentDate } },
          { status: 'opened' },
          { trash: false },
          { order: [['createdAt', 'DESC']] }
        );
      }
      if (!result) {
        return ResponseHandler.sendUnSuccessResponse( res,
          'There are no open vacancy at this moment.'
        );
      } else {
        const updatedResult = result.map(item => {
          const formattedDate = moment(item.deadline).format('MMMM, D, YYYY');
          return { ...item.toJSON(), deadline: formattedDate };
        });
        return ResponseHandler.sendSuccessResponse(res, updatedResult);
      }
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async findVacancyByTitle(req, res){
    try {
      const titleParams = req.params.title;
      const title = helpers.sanitizeTitle(titleParams);
      const escapedTitle = title.replace(/[()]/g, '\\$&');
      const result = await service.findOne({
        where: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('jobTitle')),
          'LIKE',
          `%${escapedTitle.toLowerCase()}%`
        )
      });
      if (!result) {
        return ResponseHandler.sendUnSuccessResponse(res, 'Vacancy is not found with this title');
        }else{
        return ResponseHandler.sendSuccessResponse(res, result);
        }
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }

}

export default new CareerController(service);
