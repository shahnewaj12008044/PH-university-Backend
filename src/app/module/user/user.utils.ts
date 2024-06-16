import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

//find last student
const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

//set manually id
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
  const lastStudentIdCode = lastStudentId?.substring(4,6);
  const lastStudentIdYear = lastStudentId?.substring(0,4);
  const currentSemester = payload.code;
  const currentYear = payload.year;

  if(lastStudentId && lastStudentIdYear === currentYear && lastStudentIdCode === currentSemester){
    currentId  = lastStudentId.substring(6)
  }

 
  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
  increamentId = `${payload.year}${payload.code}${increamentId}`;
  return increamentId;
};
