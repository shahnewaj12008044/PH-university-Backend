import { studentServices } from "./student.service";
import { NextFunction, Request, RequestHandler, Response } from "express";
import studentValidationSchema from "./student.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';



//get all student controller
const getAllStudents : RequestHandler = async (req, res,next) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    //send response
    sendResponse(res,{
      status:httpStatus.OK,
      success: true,
      message:'student is retrived successfully',
      data: result
    });
  } catch (err) {
   next(err)
  }
};

//get a single student controller
const getAstudent : RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getAStudentFromDB(studentId);
    //sending response
   
    sendResponse(res,{
      status:httpStatus.OK,
      success: true,
      message:"sutdent is retrived successfully",
      data: result
    })
  } catch (err) {
   next(err)
  }
};
//delete student

const deleteAStudent : RequestHandler = async (req, res,next) => {
  try {
    const {studentId} = req.params;
    const result = await studentServices.deleteAStudentFromDB(studentId);
//sending response
      sendResponse(res,{
      status:httpStatus.OK,
      success: true,
      message:"Student is deleted successfully.",
      data: result
    })
  } catch (err) {
   next(err)
  }
};


export const StudentController = {
  
  getAllStudents,
  getAstudent,
  deleteAStudent
};
