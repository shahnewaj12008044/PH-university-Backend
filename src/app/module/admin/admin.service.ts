import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status-codes';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findOne({ id });
  return result;
};

const updateSingleAdminIntoDB = async (
  id: string,
  payload: Partial<TAdmin>
) => {
  const { name, ...remainingData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

//delete Admin from DB
const deleteAdminFromDB = async( id : string) =>{
    const session =await mongoose.startSession();
    try{
      session.startTransaction()
      const deleteAdmin = await Admin.findOneAndUpdate({id},{isDeleted: true},{new:true, session})
      if(!deleteAdmin){
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin')
      }
      const deleteUser = await Admin.findOneAndUpdate({id},{isDeleted: true},{new: true, session})

      if(!deleteUser){
        throw new AppError(httpStatus.BAD_REQUEST,"Failed to delete User")
      }

     await session.commitTransaction()
     await session.endSession()
      
     return deleteAdmin;
    }catch(err){
       await session.abortTransaction()
       await session.endSession();
       throw new AppError(httpStatus.BAD_REQUEST, err as string)
    }
}

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateSingleAdminIntoDB,
  deleteAdminFromDB
};
