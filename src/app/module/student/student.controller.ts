import { studentServices } from './student.service';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import studentValidationSchema from './student.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

//Higher Order function to dry try catch syntax



//get all student controller
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudentsFromDB();
  //send response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'student is retrived successfully',
    data: result,
  });
});

//get a single student controller
const getAstudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.getAStudentFromDB(studentId);
  //sending response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'sutdent is retrived successfully',
    data: result,
  });
});
//delete student

const deleteAStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteAStudentFromDB(studentId);
  //sending response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully.',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getAstudent,
  deleteAStudent,
};
