import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";
import httpStatus from 'http-status-codes';

const createCourse = catchAsync(async(req, res)=>{
    const result = await CourseServices.createCourseIntoDB(req.body);
    
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Course is created Successfully!!!",
        data: result,
    })
})
const getAllCourses = catchAsync(async(req, res)=>{
    const result = await CourseServices.getAllCoursesFromDB(req.query)
    
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Courses are retrived Successfully!!",
        data: result,
    })
})
const getSingleCourse = catchAsync(async(req, res)=>{
    const {courseId} = req.params;
    const result = await CourseServices.getSingleCourseFromDB(courseId)
    
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Course is retrived Successfully!!",
        data: result,
    })
})
const updateSingleCourse = catchAsync(async(req, res)=>{
    const {courseId} = req.params;
    const result = await CourseServices.updateSingleCourseIntoDB(courseId, req.body)
    
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Course is retrived Successfully!!",
        data: result,
    })
})
const deleteSingleCourse = catchAsync(async(req, res)=>{
    const {courseId} = req.params;
    const result = await CourseServices.deleteCourseFromDB(courseId)
    
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Course is deleted Successfully!!",
        data: result,
    })
})
const assignFacultiesWithCourse = catchAsync(async(req, res)=>{
    const {courseId} = req.params;
    const { faculties } = req.body; 
    const result = await CourseServices.assginFacultiesWithCourseIntoDB(courseId, faculties)
    
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Faculties Assigned Successfully!!",
        data: result,
    })
})
const removeFacultiesFromCourse = catchAsync(async(req, res)=>{
    const {courseId} = req.params;
    const { faculties } = req.body; 
    const result = await CourseServices.removeFacultiesFromCourseFromDB(courseId, faculties)
    
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Faculties removed Successfully!!",
        data: result,
    })
})


export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteSingleCourse,
    updateSingleCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse
}