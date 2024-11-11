import ResponseHandler from './responseHandlerController.js';

class SuperController {
  constructor(service) {
    this.service = service;
  }

    async create(req, res, message = "Saved Successfully!") {
        try {
            const data = req.body;
            const result = await this.service.create(data);
            if (!result) {
                return ResponseHandler.sendUnSuccessResponse(res, 'Creation failed.');
            } else {
                return ResponseHandler.sendSuccessResponse(res, result, message, 201);
            }
        } catch (error) {
           ResponseHandler.sendErrorResponse(res, error);
        }
    }

    async getAll(req, res) {
        try {
          const { trash } = req.query;
          let result;
          if (trash === 'true') {
            result = await this.service.findAll({ trash: true });
          } else {
            result = await this.service.findAll({ trash: false });
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

    async getLatest(req, res) {
        try {
        const result = await this.service.findLatest({ trash: false });
        if (!result) {
            return ResponseHandler.sendUnSuccessResponse(res, 'No data found.');
        } else {
            return ResponseHandler.sendSuccessResponse(res, result);
        }
        } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
        }
    }
  
    async getById(req, res){
        try {
          const { id } = req.params;
            const result = await this.service.findById(id);
            if (!result) {
            ResponseHandler.sendUnSuccessResponse(res, 'Data not found');
            }else{
            ResponseHandler.sendSuccessResponse(res, result);
            }
        } catch (error) {
          ResponseHandler.sendErrorResponse(res, error);
        }
    }

    async updateById(req, res){
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await this.service.updateById(id, data);
            if (result[0] === 0) {
                return ResponseHandler.sendUnSuccessResponse(res, 'Data not found');
            }else{
                const updatedData = await this.service.findById(id);
                const updatedDataObject = updatedData.get();
                return ResponseHandler.sendSuccessResponse(res, updatedDataObject, "data updated successfully");
            }
        } catch (error) {
            return ResponseHandler.sendErrorResponse(res, error);
        }
    }

    async deleteById(req, res){
        try {
        const { id } = req.params;
            const result = await this.service.deleteById(id);
            if (!result) {
            ResponseHandler.sendUnSuccessResponse(res, 'Data not found');
            }else{
            ResponseHandler.sendSuccessResponse(res, result, "Data Deleted Successfully");
            }
        } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
        }
    }
    
    async moveToTrash(req, res) {
        try {
          const { id } = req.params;
          const result = await this.service.updateById(id, { trash: true });
          if (result[0] === 0) {
            ResponseHandler.sendUnSuccessResponse(res, 'Data not found');
          } else {
            ResponseHandler.sendSuccessResponse(res, result, "Data moved to Trash");
          }
        } catch (error) {
          ResponseHandler.sendErrorResponse(res, error);
        }
      }
      
    async backupFromTrash(req, res) {
        try {
          const { id } = req.params;
          const result = await this.service.updateById(id, { trash: false });
          if (result[0] === 0) {
            ResponseHandler.sendUnSuccessResponse(res, 'Data not found');
          } else {
            ResponseHandler.sendSuccessResponse(res, result, "Data backed-up from Trash!");
          }
        } catch (error) {
          ResponseHandler.sendErrorResponse(res, error);
        }
      }
    
    async deleteAll(req, res){
        try {
            const result = await this.service.deleteAll();
            if (result[0] === 0) {
            ResponseHandler.sendUnSuccessResponse(res, 'Data not found');
            }else{
            ResponseHandler.sendSuccessResponse(res, result, "All Data deleted Successfully");
            }
        } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
        }
    }

    async countDocuments(req, res) {
        try {
            const count = await this.service.countDocuments();
            if (count === 0) {
            ResponseHandler.sendUnSuccessResponse(res, 'Data not found');
            }else{
            ResponseHandler.sendSuccessResponse(res, count);
            }
        } catch (error) {
            ResponseHandler.sendErrorResponse(res, error);
        }
    }

}

export default SuperController;
