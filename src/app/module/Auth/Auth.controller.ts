
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


export const AuthController = {
    loginUser,
}