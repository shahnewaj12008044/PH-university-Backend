import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import httpStatus from 'http-status-codes';
import { AuthServices } from './Auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserIntoDB(req.body);
  const {accessToken, refreshToken, needsPasswordChange} = result;

  //setting the refresh token in the cookie
  res.cookie('refreshToken',refreshToken,{
    secure:config.NODE_ENV === 'production',
    httpOnly: true,
  })
  //response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'User is logged in Successfully!!!',
    data: {accessToken, needsPasswordChange},
  });
});



const changePassword = catchAsync(async (req, res) => {
  const { ...paswordData } = req.body;
  // console.log(user,paswordData)

  const result = await AuthServices.changePasswordIntoDB(req.user, paswordData);

  //response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Password is changed  Successfully!!!',
    data: result,
  });
});


const refreshToken = catchAsync(async (req, res) => {

  const {refreshToken} = req.cookies;
  // console.log(refreshToken)
  const result = await AuthServices.generateRefreshToken(refreshToken);
  console.log(result)
 
  //response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'refresh Token is retrieved  Successfully!!!',
    data: result
  });
});


export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
};
