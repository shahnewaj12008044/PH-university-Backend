import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import httpStatus from 'http-status-codes';
import { AuthServices } from './Auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserIntoDB(req.body);

  //response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'User is logged in Successfully!!!',
    data: result,
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

export const AuthController = {
  loginUser,
  changePassword,
};
