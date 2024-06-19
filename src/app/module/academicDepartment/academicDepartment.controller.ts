import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
    req.body
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfullly',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async(req, res)=>{
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
    sendResponse(res,{
        status : httpStatus.OK,
        success: true,
        message: "Academic Faculty Data retrived successfully",
        data: result,
    })
})

const getSingleAcademicDepartment = catchAsync(async(req, res)=>{
    const {departmentID} = req.params;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentID);
    sendResponse(res,{
      status:httpStatus.OK,
      success:true,
      message:"Academic Faculty Data retrived successfully!",
      data:result,
    })

})

const updateSingleAcademicDepartment = catchAsync(async(req,res)=>{
    const {departmentID} =  req.params;
    const result = await AcademicDepartmentServices.updateSingleAcademicDepartmentIntoDB(departmentID,req.body);
    sendResponse(res,{
      status:httpStatus.OK,
      success:true,
      message:"Academic Faculty Updated Successfully",
      data: result,
    })
})


export const AcademicDepartmentController = {
    createAcademicDepartment,
   getAllAcademicDepartment,
   getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
};
