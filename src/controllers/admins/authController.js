import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import Admin from "../../models/admins/Admin.js";
import validator from "../../validators/adminValidator.js";
import helpers from '../../utils/helpers.js';
import CommonService from "../../services/adminService.js";
const service = new CommonService(Admin);

class AuthController extends SuperController {
    constructor(service) {
        super(service);
        this.service = service;  
    }
  
  async authenticateAdmin(req, res){
      try {
      const { error, value } = validator.validateLogin(req.body);
      if(error){
        return ResponseHandler.validationErrorResponse(res, error);
      }
      const username = value.username;
      const password = value.password;
      let data = await service.findOneByOrTwoFieldNames({ phoneNumber: username }, { email: username } );
      if (data) {
        const storedPassword = data.password;
        const loginData = data.get(); 
        delete loginData.password; 
        const passwordMatch = await helpers.comparePasswords(password, storedPassword);
          if (passwordMatch) {
          const token = helpers.signJwtToken(data.id, data.role);
          req.token = token; 
          // res.cookie('token', token, { httpOnly: true });
          return res.status(200).json({success:true, message: "Login Succesfully", token: token, data: data})
          } else {
          return ResponseHandler.sendUnSuccessResponse(res, 'Incorrect Credentials! Please, try again!');
          }
      } else {
          return ResponseHandler.sendUnSuccessResponse(res, 'Invalid Credentials! Please, try again!');
      }
      } catch (error) {
          ResponseHandler.sendErrorResponse(res, error);
      }
  }

  async registerAdmin(req, res){
    try {
      const { error, value } = validator.validateAdmin(req.body);
      if(error){
        return ResponseHandler.validationErrorResponse(res, error);
      }
      const { phoneNumber, email, password, role } = value;
      const duplicatedData = await service.checkEmailOrPhone(phoneNumber, email);
      if (duplicatedData) {
        if (duplicatedData.phoneNumber === phoneNumber) {
          return ResponseHandler.sendUnSuccessResponse(res, 'Phone Number already exists!');
        } else {
          return ResponseHandler.sendUnSuccessResponse(res, 'Email already exists!');
        }
      }
        const hashedPassword = await helpers.hashPassword(password);
        value.password = hashedPassword;
        const data = await service.create(value);
        const responseData = data.get(); 
        delete responseData.password; 
        const token = helpers.signJwtToken(data.id, role);
        return res.status(201).json({success:true, message: "Data Saved Successfully", token: token, data: data})
    } catch (error) {
        ResponseHandler.sendErrorResponse(res, error, "Error During Registration! Try Again Please!");
    }
  }
  
  // async registerShareHolder(data){
  //   const dataValue = data; 
  //   try {
  //     const { error, value } = validator.validateAdmin(dataValue);
  //     if(error){
  //       throw new Error(error)
  //       // return ResponseHandler.validationErrorResponse(res, error);
  //     }
  //     const { phoneNumber, email, password } = value;
  //     const duplicatedData = await service.checkEmailOrPhone(phoneNumber, email);
  //     if (duplicatedData) {
  //       if (duplicatedData.phoneNumber === phoneNumber) {
  //       throw new Error("Phone Number already exists!");
  //       // return ResponseHandler.sendUnSuccessResponse(res, 'Phone Number already exists!');
  //       } else {
  //       throw new Error("Email already exists!")
  //         // return ResponseHandler.sendUnSuccessResponse(res, 'Email already exists!');
  //       }
  //     }
  //       const hashedPassword = await helpers.hashPassword(password);
  //       value.password = hashedPassword;
  //       const data = await service.create(value);
  //       return { userId: data.id, error: null };
  //   } catch (error) {
  //       throw new Error(error)
  //       // return ResponseHandler.sendErrorResponse(res, error, "Error During ShareHolder Registration! Try Again Please!");
  //   }
  // }

  async registerShareHolder(data) {
    const dataValue = data;
    try {
        const { error, value } = validator.validateAdmin(dataValue);
        if (error) {
            throw new Error(error);
        }
        // Validate role
        const allowedRoles = ['admin', 'shareholder'];
        if (!allowedRoles.includes(value.role)) {
            throw new Error(`Invalid role: ${value.role}. Allowed roles are: ${allowedRoles.join(', ')}`);
        }
        const { phoneNumber, email, password } = value;
        const duplicatedData = await service.checkEmailOrPhone(phoneNumber, email);
        if (duplicatedData) {
            if (duplicatedData.phoneNumber === phoneNumber) {
                throw new Error("Phone Number already exists!");
            } else {
                throw new Error("Email already exists!");
            }
        }
        const hashedPassword = await helpers.hashPassword(password);
        value.password = hashedPassword;
        const data = await service.create(value);
        return { userId: data.id, error: null };
    } catch (error) {
        throw new Error(error); // Log or handle the error appropriately
    }
}


}

export default new AuthController(service);