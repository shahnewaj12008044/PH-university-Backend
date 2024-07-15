import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { Faculty } from './faculty.model';
import { FacultySearchableFields } from './facutly.constant';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status-codes';
import { TFaculty } from './faculty.interface';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await facultyQuery.modelQuery;
  return result;
};

//get single student
const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findOne({ id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const updateSingleFacultyintoDB = async (
  id: string,
  payload: Partial<TFaculty>
) => {
  const { name, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  // console.log(modifiedUpdatedData)
  const result = await Faculty.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
//delete a student from db
const deleteAFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  deleteAFacultyFromDB,
  updateSingleFacultyintoDB,
};
