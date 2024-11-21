import SuperController from '../superController.js';
import Candidate from '../../models/admins/Candidate.js';
import AdminService from '../../services/adminService.js';
import ResponseHandler from '../responseHandlerController.js';
import { VotingSession } from '../../models/admins/Associations.js';

const service = new AdminService(Candidate);

class CandidateController extends SuperController {
  constructor(service) {
    super(service);
    this.service = service;
  }
  
  async create(req, res) {
    const fileField = "avatar"; 
    try{
      if (req.file && fileField) {
          const uploadedFile = req.file;
          req.body[fileField] = uploadedFile.filename;
      }   
      return super.create(req, res);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
  
  async getAll(req, res) {
    try {
      const { trash } = req.query;
      let result;
      if (trash === 'true') {
        result = await service.findAllVotingPopulatedData(VotingSession, "sessionData", { trash: true });
      } else {
        result = await service.findAllVotingPopulatedData(VotingSession, "sessionData", { trash: false });
      }
    if (!result) {
        return ResponseHandler.sendUnSuccessResponse(res, 'No data found.');
    } else {
        return ResponseHandler.sendSuccessResponse(res, result);
    }
    } catch (error) {
    ResponseHandler.sendErrorResponse(res, error);
    }
  }

  async updateById(req, res) {
    const fileField = "avatar"; 
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
    const fileField = "avatar"; 
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


export default new CandidateController(service);
