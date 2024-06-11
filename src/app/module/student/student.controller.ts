import { studentServices } from "./student.service";
import { Request, Response } from "express";
import studentValidationSchema from "./student.validation";



//get all student controller
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: "Students data are retrieved successfully.",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err,
    });
  }
};

//get a single student controller
const getAstudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getAStudentFromDB(studentId);
    //sending response
    res.status(200).json({
      success: true,
      message: "sutdent is retrived successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err,
    });
  }
};
//delete student

const deleteAStudent = async (req: Request, res: Response) => {
  try {
    const {studentId} = req.params;
    const result = await studentServices.deleteAStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: "Student is deleted successfully.",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err,
    });
  }
};


export const StudentController = {
  
  getAllStudents,
  getAstudent,
  deleteAStudent
};
