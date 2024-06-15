import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

//insert student data controller
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  //will call service func to get this data
  const result = await UserServices.createStudentIntoDB(password, studentData);
  //send response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'student is created successfully',
    data: result,
  });
});



export const UserControllers = {
  createStudent,
};
