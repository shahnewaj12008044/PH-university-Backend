import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { semesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async(req, res)=>{
    const result = await semesterRegistrationServices.createSemesterIntoDB(req.body)
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Semester is created successfully.',
        data: result,
      });
})
const getAllSemesterRegistrations = catchAsync(async(req, res)=>{
    const result = await semesterRegistrationServices.getAllSemesterRegistrationsFromDB(req.query)
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Semester Registrations data is retrived  successfully.',
        data: result,
      });
})
const getSingleSemesterRegistrations = catchAsync(async(req, res)=>{

    const {semesterId} = req.params;
    const result = await semesterRegistrationServices.getSingleSemesterRegistrationsFromDB(semesterId);
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Semester Registrations data is retrived  successfully.',
        data: result,
      });
})
const updateSingleSemesterRegistrations = catchAsync(async(req, res)=>{

    const {semesterId} = req.params;
    const result = await semesterRegistrationServices.updateSingleSemesterRegistrationsFromDB(semesterId, req.body);
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Semester Registrations data is updated successfully.',
        data: result,
      });
})


export const semesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistrations,
    updateSingleSemesterRegistrations,
}