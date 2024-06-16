import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';
import httpStatus from 'http-status-codes';

//create academic semester
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

//get all academic semesters
const getAllAcademicSemesters = catchAsync(async(req, res)=>{
  const result =await AcademicSemesterServices.getAllAcademicSemestersFromDB();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic semesters Data is retrived  successfully',
    data: result,
  });
});

//get single Academic semester controller:
const getSingleAcademicSemester = catchAsync(async(req,res)=>{
      const {semesterId} = req.params;
      const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
      // console.log(result)
      sendResponse(res,{
        status: httpStatus.OK,
        success: true,
        message:"Academic semester data by id is retrived successfully",
        data: result,
      })
})

//update single semester controller

const updateSingleAcademicSemester = catchAsync(async(req, res)=>{
    const {semesterId} = req.params;
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(semesterId,req.body);

    sendResponse(res, {
      status: httpStatus.OK,
      success:true,
      message:"Academic semester is updated successfully",
      data: result,
    })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester
};
