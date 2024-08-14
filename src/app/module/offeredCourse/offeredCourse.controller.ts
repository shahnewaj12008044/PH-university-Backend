import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body
  );
  // console.log(req.query)
  //send response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Offered Course is created successfully',
    data: result,
  });
});

//update offered course:
const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.updateOffereCourseIntoDB(
    id,
    req.body
  );
  // console.log(req.query)
  //send response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Offered Course is updated successfully!!!',
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourseFromDB(
    req.query
  );
  // console.log(req.query)
  //send response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Offered Courses are retrived successfully!!!',
    data: result,
  });
});
const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);
  // console.log(req.query)
  //send response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Offered Course is retrived successfully!!!',
    data: result,
  });
});
const deleteSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.deleteSingleOfferedCourseFromDB(id);
  // console.log(req.query)
  //send response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Offered Course is deleted successfully!!!',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  deleteSingleOfferedCourse,
};
