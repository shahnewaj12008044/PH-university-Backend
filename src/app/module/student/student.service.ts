import { TStudent } from "./student.interface";
import { Student } from "./student.model";



const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getAStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};
const deleteAStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {

  getAllStudentsFromDB,
  getAStudentFromDB,
  deleteAStudentFromDB,
};
