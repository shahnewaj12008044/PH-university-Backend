import AppError from '../../errors/AppError';
import httpStatus from 'http-status-codes';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../Course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { hasTimeConflict } from './offeredCourse.utils';
import QueryBuilder from '../../builder/QueryBuilder';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;
  //Checking semester registration id is valid or not
  const isSemesterRegistraionExist = await SemesterRegistration.findById(
    semesterRegistration
  );
  if (!isSemesterRegistraionExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration Not Found!!'
    );
  }

  //Checking Academic semester  id is valid or not
  const academicSemester = isSemesterRegistraionExist?.academicSemester;

  //Checking Academic Faculty id is valid or not
  const isAcademicFacultyExist = await AcademicFaculty.findById(
    academicFaculty
  );
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty Not Found!!');
  }

  //Checking Academic Department id is valid or not
  const isAcademicDepartmentExist = await AcademicDepartment.findById(
    academicDepartment
  );
  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department Not Found!!');
  }

  //Checking Course id is valid or not
  const isCourseExist = await Course.findById(course);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course Not Found!!');
  }

  //Checking Faculty id is valid or not
  const isFaculty = await Faculty.findById(faculty);
  if (!isFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty Not Found!!');
  }
  //checking if the department is belong to the faculty:
  const isAcademicDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });
  // console.log(isAcademicDepartmentBelongToFaculty)
  if (!isAcademicDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This ${isAcademicDepartmentExist.name} is not  belong to ${isAcademicFacultyExist.name}`
    );
  }

  //check if the same offered course with same section in same registered semester exist:
  const isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({ semesterRegistration, course, section });
  if (isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This course with same section and same semester registration exist`
    );
  }
  //checking time conflict (if the faculty has another class at the same time)
  const assignedSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignedSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is unavailable at that time choose another time or day!!`
    );
  }
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const updateOffereCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExist = await OfferedCourse.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course is  Not Found!!');
  }
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is  Not Found!!');
  }
  const semesterRegistration = isOfferedCourseExist.semesterRegistration;
  //checking if the semesterRegistration status is upcoming otherwise the update will be cancelled
  const semesterRegistrationStatus = await SemesterRegistration.findById(
    semesterRegistration
  );
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update the Offered course a it is ${semesterRegistrationStatus?.status}`
    );
  }
  //checking time conflict (if the faculty has another class at the same time)
  const assignedSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignedSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is unavailable at that time choose another time or day!!`
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const OfferedCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await OfferedCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  if(!result){
    throw new AppError(httpStatus.NOT_FOUND, "Offered course is not found!!!")
  }
  return result;
};


const deleteSingleOfferedCourseFromDB = async(id: string) =>{
    /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExist = await OfferedCourse.findById(id);
  if(!isOfferedCourseExist){
    throw new AppError(httpStatus.NOT_FOUND, "Offered Course is not found");
  }

  const semesterRegistration = isOfferedCourseExist.semesterRegistration;
  const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration).select('status');
 
  if(semesterRegistrationStatus?.status !== "UPCOMING"){
    throw new AppError(httpStatus.BAD_REQUEST,`You can not delete a ${semesterRegistrationStatus} course`);
  }

  const result = await OfferedCourse.findByIdAndDelete(id)
  return result;
}

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  updateOffereCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  deleteSingleOfferedCourseFromDB,
};
