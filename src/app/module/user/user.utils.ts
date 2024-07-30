 import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

//find last student
const findLastId = async (role : string) => {
  const lastPerson = await User.findOne({ role: role }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastPerson?.id ? lastPerson.id : undefined;
};

//set manually id
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastId('student');
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

export const generateFacultyId = async() =>{
    let currenFacultyId = 0;
    const lastFacultyId = await findLastId('faculty');
    if(lastFacultyId){
      currenFacultyId = Number(lastFacultyId.substring(2,6)) + 1;
    }else{
      currenFacultyId = 1;
    }
    const incrementFacultyId = currenFacultyId.toString().padStart(4,'0')
    return `F-${incrementFacultyId}`
}
export const generateAdminId = async() =>{
    let currentAdminId = 0;
    const lastAdminId = await findLastId('admin');
    if(lastAdminId){
      currentAdminId = Number(lastAdminId.substring(2,6)) + 1;
    }else{
      currentAdminId = 1;
    }
    const incrementFacultyId = currentAdminId.toString().padStart(4,'0')
    return `A-${incrementFacultyId}`
}
