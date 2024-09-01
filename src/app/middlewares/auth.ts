import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../module/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //checking if the token is given or not
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    //checking if the token is valid or not
    // invalid token
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized!'
          );
        }

        const role = (decoded as JwtPayload)?.role;

        if(requiredRoles && !requiredRoles.includes(role)){
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized!'
          );
        }
        // console.log(decoded)
        req.user = decoded as JwtPayload;
        next(); 
      }
    );
  });
};

export default auth;
