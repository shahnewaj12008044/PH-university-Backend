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
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultydata } = req.body;
  //will call service func to get this data
  const result = await UserServices.createFacultyIntoDB(password, facultydata);
  // console.log(result)
  //send response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});



const createAdmin = catchAsync(async (req, res) => {
  const { password, admin} = req.body;
  // console.log(req.body)
  // console.log(adminData)
  //will call service func to get this data
// console.log('before controller',password, admin)
  const result = await UserServices.createAdminIntoDB(password, admin)
  console.log('after result', result)
  //send response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'admin is created successfully',
    data: result,
  });
});



export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,

};
