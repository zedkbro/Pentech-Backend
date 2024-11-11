class ResponseHandlerController  {
    static sendSuccessResponse(res, data, message, statusCode = 200) {
      return res.status(statusCode).json({ 
        success: true,
        data, 
        message 
      });
    }

    static sendUnSuccessResponse(res, message, statusCode = 404) {
        return res.status(statusCode).json({
        success: false,
        message: message
      });
    }
  
    static sendErrorResponse(res, error, message, statusCode = 500) {
      return res.status(statusCode).json({
        success: false,
        error: error.message,
        message: message
      });
    }

    static validationErrorResponse(res, error, message, statusCode = 400) {
      return res.status(statusCode).json({
        success: false,
        error: error.details[0].message,
        message: message
      });
    }
}  

export default ResponseHandlerController;
