import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';
import httpStatus from 'http-status-codes';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfullly',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async(req, res)=>{
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();
    sendResponse(res,{
        status : httpStatus.OK,
        success: true,
        message: "Academic Faculty Data retrived successfully",
        data: result,
    })
})

const getSingleAcademicFaculty = catchAsync(async(req, res)=>{
    const {facultyID} = req.params;
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyID);
    sendResponse(res,{
      status:httpStatus.OK,
      success:true,
      message:"Academic Faculty Data retrived successfully!",
      data:result,
    })

})

const updateSingleAcademicFaculty = catchAsync(async(req,res)=>{
    const {facultyID} =  req.params;
    const result = await AcademicFacultyServices.updateSingleAcademicFacultyIntoDB(facultyID,req.body);
    sendResponse(res,{
      status:httpStatus.OK,
      success:true,
      message:"Academic Faculty Updated Successfully",
      data: result,
    })
})


export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
};
