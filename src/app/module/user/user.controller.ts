import { Request, Response } from 'express';
import { studentServices } from '../student/student.service';
import { UserServices } from './user.service';

//insert student data controller
const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    //will call service func to get this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "something went wrong",
    //     error: error.details,
    //   });
    // }//*joi ends */

    //send response

    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const UserControllers = {
  createStudent,
};
