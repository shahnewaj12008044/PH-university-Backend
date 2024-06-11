import { StringValidation, object } from 'zod';
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { User } from './user.model';
import { NewUser } from './user.interface';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a new user
  let user: NewUser = {};

  //set pass to the user
  user.password = (config.default_pass as string) || password;
  //set role
  user.role = 'student';
  //set manually id
  user.id = "2030201000";
  const result = await User.create(user); //built in static method

  //create a student
  if(Object.keys(result).length){
    //set id , _id as user
    studentData.id = result.id;
    studentData.user = result._id;
  }

  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
