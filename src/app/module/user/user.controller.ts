import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';

//insert student data controller
const createStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { password, student: studentData } = req.body;

    //will call service func to get this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    //send response
    sendResponse(res,{
      status:httpStatus.OK,
      success: true,
      message:'student is created successfully',
      data: result
    })

  } catch (err) {
    next(err)
  }
};

export const UserControllers = {
  createStudent,
};
