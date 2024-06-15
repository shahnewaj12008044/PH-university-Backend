import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';
import httpStatus from 'http-status-codes';

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

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
