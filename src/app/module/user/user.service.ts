import config from '../../config';
import { TStudent } from '../student/student.interface';
import { User } from './user.model';
import { TUser } from './user.interface';
import { Student } from '../student/student.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

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
  // console.log(admissionSemester)
  // if(!admissionSemester){
  //   throw new Error("Semester is not found")
  // }
  //set  generated id
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  // console.log(userData.id);
  const newUser = await User.create(userData); //built in static method
  //create a student
  if (Object.keys(newUser).length) {
    //set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //referrence _id
    //create new student
    const newStudent = Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
