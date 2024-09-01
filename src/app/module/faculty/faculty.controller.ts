
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';

//get all student controller
const getAllFaculties = catchAsync(async (req, res) => {
  
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);
  // console.log(req.query)
  // console.log(req.cookies)
  //send response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faculty is retrived successfully',
    data: result,
  });
});

//get a single student controller
const getSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId  } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(facultyId );
  //sending response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faculty is retrived successfully',
    data: result,
  });
});
//delete student

const upadateSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const {faculty} = req.body;
  
  const result = await FacultyServices.updateSingleFacultyintoDB(facultyId,faculty);
  //sending response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faculties is updated successfully.',
    data: result,
  });
});
const deleteSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyServices.deleteAFacultyFromDB(facultyId);
  //sending response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faculty is deleted successfully.',
    data: result,
  });
});

export const FacultyController = {
    getAllFaculties,
    getSingleFaculty,
    deleteSingleFaculty,
    upadateSingleFaculty
};
