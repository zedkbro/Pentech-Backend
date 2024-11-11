import SuperController from '../superController.js';
import ResponseHandler from '../responseHandlerController.js';
import { Op } from 'sequelize';
import { deleteImage } from '../../utils/unlinkImages.js';
import sendPasswordResetEmail from "../../utils/emailService.js";
import helpers from '../../utils/helpers.js';
import Admin from "../../models/admins/Admin.js";
import AdminService from "../../services/adminService.js";

const service = new AdminService(Admin);

class AdminController extends SuperController {
    constructor(service) {
        super(service);
        this.service = service;  
    }
    
    async getByTokenId(req, res) {
      const { id } = req.user;
        try {
          const result = await service.findProfileById(id);
          if (!result) {
              return ResponseHandler.sendUnSuccessResponse(res, "Data not found");
          } else {
              return ResponseHandler.sendSuccessResponse(res, result);
          }
        } catch (error) {
        ResponseHandler.sendErrorResponse(res, error);
        }
    }

    async updateByTokenId(req, res) {
      const { id } = req.user;
        try{
          const update = { ...req.body };
          delete update.password;
          const existingAdmin = await service.checkEmailOrPhoneToUpdate(
              {
                [Op.or]: [
                  { email: update.email },
                  { phoneNumber: update.phoneNumber }
                ]
              },
              { id: { [Op.ne]: id } }
            );
          if (existingAdmin) {
            if (existingAdmin.email === update.email) {
              return ResponseHandler.sendUnSuccessResponse(
                res, "This Email is already registered by another user. Please try another!"
              );
            } else if (existingAdmin.phoneNumber === update.phoneNumber) {
              return ResponseHandler.sendUnSuccessResponse(
                res, "This Phone Number is already registered by another user. Please try another!"
              );
            }
            
          } else {
            const result = await service.updateById(id, update );
            if (result[0] === 0) {
                return ResponseHandler.sendUnSuccessResponse(res, 'Data not found');
            }else{
              const updatedData = await service.findById(id);
              const updatedDataObject = updatedData.get();
              delete updatedDataObject.password;
            return ResponseHandler.sendSuccessResponse(res, updatedDataObject, "Profile Updated Successfully");
            }
          }
        } catch (error) {
          return ResponseHandler.sendErrorResponse(res, error);
        }
    }
    
    async deleteByTokenId(req, res) {
        const imageField = "avatar"; 
        const { id } = req.user;
        try{
            const existingData = await service.findById(id); 
            if (existingData && existingData[imageField]) {
                await deleteImage(existingData[imageField]);
            }
            const result = await service.deleteById(id);
            if (!result) {
            return ResponseHandler.sendUnSuccessResponse(res, 'Data not found');
            }else{
            return ResponseHandler.sendSuccessResponse(res, result, "data deleted Successfully");
            }
        } catch (error) {
          ResponseHandler.sendErrorResponse(res, error);
        }
    }
    
    async editAdminProfilePhoto(req, res) {
        const adminId = req.user.id;
        try {
          const admindata = await service.findById(adminId);
          if (!admindata) {
            return ResponseHandler.sendUnSuccessResponse(res, "Data not found");
          }
          let avatarName = null;
          if (req.file) {
            avatarName = req.file.filename;
            const updatedAdmin = await service.updateById(
            adminId,
            { avatar: avatarName }
            );
            if (updatedAdmin[0] === 0) {
              return ResponseHandler.sendUnSuccessResponse(res, 'Data not found');
            }
            if (admindata && admindata['avatar']) {
            await deleteImage(admindata['avatar']);
            }
            return ResponseHandler.sendSuccessResponse(
              res, updatedAdmin, "Profile picture updated successfully"
            );
          } else {
            return ResponseHandler.sendUnSuccessResponse(
              res, "You have not choosen any picture yet."
            );
          }
        } catch (error) {
          ResponseHandler.sendErrorResponse(res, error);
        }
    }
    
    async changeAdminPassword(req, res) {
        const adminId = req.user.id; 
        try {
          const { oldPassword, newPassword } = req.body;
          const isValidPassword = await helpers.validatePassword(newPassword);
          if (!isValidPassword) {
            return ResponseHandler.sendUnSuccessResponse(
              res, "Password must be greater than 8 & less than 20 characters."
            );
          }
          const admin = await service.findById(adminId);
          if (!admin) {
            return ResponseHandler.sendUnSuccessResponse(res, "Admin Not Found");
          }
          const passwordMatch = await helpers.comparePasswords(
            oldPassword, admin.password
          );
          if (!passwordMatch) {
            return ResponseHandler.sendUnSuccessResponse(
              res, "Old password is incorrect! Try Again!"
            );
          }
          const hashedPassword = await helpers.hashPassword(newPassword);
          const newAdminPassword = await service.updateById(
              adminId,
              { password: hashedPassword }
          );
          if (newAdminPassword[0] === 0) {
            return ResponseHandler.sendUnSuccessResponse(res, 'Password is not changed! Because of, Data not found');
          }else {
            return ResponseHandler.sendSuccessResponse(
              res, null, "Password changed successfully!"
            );
          }
        } catch (error) {
          ResponseHandler.sendErrorResponse(res, error);
        }
    }
    
    async forgotPassword(req, res) {
        const { email } = req.body;
        try {
          const admin = await service.findOne({ email: email });
          if (!admin) {
            return ResponseHandler.sendUnSuccessResponse(res, "This Email is not found in our System.");
          }
          const timestamp = Date.now();
          const token = helpers.signJwtToken(admin.id, timestamp); 
          const resetLink = `http://192.168.137.72:5173/auth/reset-password?resetToken=${token}`;
          await sendPasswordResetEmail(email, resetLink);
          return ResponseHandler.sendSuccessResponse(
            res, null, "Password reset email sent successfully. Check Your Email please!"
          );
        } catch (error) {
          ResponseHandler.sendErrorResponse(res, error);
        }
    }
    
    async resetPassword(req, res) {
        const EXPIRATION_TIME = process.env.PASSWORD_RESET_TOKEN_EXPIRATION_TIME;
        try {
          const token = req.params.resetToken;
          const decoded = helpers.verifyJwtToken(token);
          const id = decoded.id;
          const tokenTimestamp = decoded.role;
          const currentTimestamp = Date.now();
          const differenceInMinutes = helpers.getDateDifferenceInMinutes(
            tokenTimestamp,
            currentTimestamp
          );
          if (differenceInMinutes > EXPIRATION_TIME) {
            return ResponseHandler.sendUnSuccessResponse(
              res, "Reset token has expired. Try Again to forget Your Password Please!"
            );
          }
          const admin = await service.findById(id);
          if (!admin) {
            return ResponseHandler.sendUnSuccessResponse(
              res, "Invalid or expired reset token!"
            );
          }
          const { newPassword } = req.body;
          const hashedPassword = await helpers.hashPassword(newPassword);
          const result = await service.updateById(
           admin.id,
           { password: hashedPassword }
         );
         if (result[0] === 0) {
             return ResponseHandler.sendUnSuccessResponse(res, 'Your Password is not Reseted. since Your Data not found!');
         }
          return ResponseHandler.sendSuccessResponse(
            res, null, "Password Changed successfully!"
          );
        } catch (error) {
          ResponseHandler.sendErrorResponse(res, error);
        }
    }

}

export default  new AdminController(service);