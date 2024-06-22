import config from '../../config';
import { TStudent } from '../student/student.interface';
import { User } from './user.model';
import { TUser } from './user.interface';
import { Student } from '../student/student.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a new user
  const userData: Partial<TUser> = {};
  //set pass to the user
  userData.password = (config.default_pass as string) || password;
  //set role
  userData.role = 'student';
  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );
  //creating a isolation session for transaction
  const session = await mongoose.startSession();

  try {
    //set  generated id
    session.startTransaction();
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester
    );

    const newUser = await User.create([userData], { session }); //built in static method
    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User!!!');
    }
    //set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //referrence _id
    //create new student
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST,"Failed to create Student")
  }
};

export const UserServices = {
  createStudentIntoDB,
};
