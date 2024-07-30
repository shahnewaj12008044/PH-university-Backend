import config from '../../config';
import { TStudent } from '../student/student.interface';
import { User } from './user.model';
import { TUser } from './user.interface';
import { Student } from '../student/student.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

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
    throw new AppError(httpStatus.BAD_REQUEST,err as string)
  }
};
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  //create a new user
  const userData: Partial<TUser> = {};
  //set pass to the user
  userData.password =  password || (config.default_pass as string);
  //set role
  userData.role = 'faculty';
  
  //creating a isolation session for transaction
  const session = await mongoose.startSession();

  try {
    //set  generated id
    session.startTransaction();
    userData.id = await generateFacultyId()

    const newUser = await User.create([userData], { session }); //built in static method
    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User!!!');
    }
    //set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //referrence _id
    //create new student
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST,err as string)
  }
};

const createAdminIntoDB = async( password: string, payload: TAdmin) =>{
  //create a new user
  const userData : Partial<TUser> = {};
  userData.password = password ||(config.default_pass as string);
  userData.role = 'admin';
  //creating isolation session for transaction
  const session = await mongoose.startSession();
  try{
    session.startTransaction();
    userData.id = await generateAdminId();
    // console.log(userData)
    const newUser = await User.create([userData], { session }); //built in static method
    //create a user
    // console.log(newUser)
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User!!!');
    }
    //set userId id and _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload],{session});
    // console.log(newAdmin)
    if(!newAdmin.length){
      throw new AppError(httpStatus.BAD_REQUEST,'Failed To Create Admin!!!')
    }
  
    await session.commitTransaction();
    await session.endSession();
    console.log(newAdmin)
    return newAdmin;
  }catch(err){
    // console.log(err)
    await session.abortTransaction();
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, err as string)
  }

}

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
