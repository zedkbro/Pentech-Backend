import jwt from 'jsonwebtoken'; 
import bcrypt, { hash } from "bcrypt";

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
          return hashedPassword;
    } catch (error) {
        throw new Error('Invalid Password Hashing');
    }
};

const comparePasswords = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error('Password is not matched');
    }
};

const validatePassword = async (password) => {
  const minLength = 8; 
  const maxLength = 20; 
  if (password.length < minLength || password.length > maxLength) {
    return false; 
  }
  return true; 
};

const signJwtToken = (id, role) => {
    try {
        return jwt.sign(
            { id: id, role: role },
            process.env.JWT_SECRET, 
            { expiresIn: '24h', algorithm: 'HS256' }
        );
    } catch (error) {
        throw new Error('Invalid signing of Token');
    }
};

const verifyJwtToken = (token) => {
    try {
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET,
            { algorithm: 'HS256' }
        );
        return decoded;
    } catch (error) {
        throw new Error('Invalid token!');
    }
};

const getDateDifferenceInHours = (start, end) => {
    try {
      const timestamp1 = new Date(start).getTime();
      const timestamp2 = new Date(end).getTime();
      const differenceInMilliseconds = Math.abs(timestamp2 - timestamp1);
      const differenceInHours = Math.floor(differenceInMilliseconds / 3600000); // Convert milliseconds to hours
      return differenceInHours;
    } catch (error) {
      throw new Error(`Cannot calculate the difference in hours. The provided values may not be valid dates.${error}`);
    }
};

const getDateDifferenceInMinutes = (start, end) => {
    try{
        const timestamp1 = new Date(start).getTime();
        const timestamp2 = new Date(end).getTime();
        const differenceInMilliseconds = Math.abs(timestamp2 - timestamp1);
        const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000);
        return differenceInMinutes;
    } catch (error) {
        throw new Error(`Can Not Extract Minutes, it may not be formal date.${error}`);
    }
  };

  function sanitizeTitle(title) {
    return title.replace(/[-\s]+/g, ' ').trim(); 
    //this function checks if there are one or more - or spaces & change to one space
  }


export default { hashPassword, comparePasswords, signJwtToken, verifyJwtToken, 
    getDateDifferenceInHours, getDateDifferenceInMinutes, validatePassword,
    sanitizeTitle
};