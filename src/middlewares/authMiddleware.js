import ResponseHandler from '../controllers/responseHandlerController.js';
import helpers from '../utils/helpers.js';

export async function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // const token = req.cookies ? req.cookies.token : null;   // token in cookie
  if (!token) { 
    return ResponseHandler.sendUnSuccessResponse(res, 'Missing authorization token!', 401);
  }
  try {
    const decoded = helpers.verifyJwtToken(token);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return ResponseHandler.sendErrorResponse(res, error, 'JWT verification failed!');
  }
}

export function authorize(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
        return ResponseHandler.sendUnSuccessResponse(res, "Unauthenticated User! Please Login again", 401 );
    }
    const { role } = req.user;
    if (req.user && allowedRoles.includes(role)) {
      next();
    } else {
        return ResponseHandler.sendUnSuccessResponse(res, "Access Denied!", 403);
    }
  };
}
