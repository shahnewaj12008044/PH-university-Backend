import config from '../../config';
import { TStudent } from '../student/student.interface';
import { User } from './user.model';
import { TUser } from './user.interface';
import { Student } from '../student/student.model';


const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a new user
  const userData: Partial<TUser> = {};

  //set pass to the user
  userData.password = (config.default_pass as string) || password;
  //set role
  userData.role = 'student';
  //set manually id
  userData.id = "2030201003";
  const newUser = await User.create(userData); //built in static method

  //create a student
  if(Object.keys(newUser).length){
    //set id , _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;  //referrence _id

    //create new student
    const newStudent = Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
