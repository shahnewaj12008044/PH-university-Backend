//step-1: create an interface (line 4-40)

import { Model, Types } from "mongoose";

//step-2 create a schema()
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation?: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation?: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation?: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user:Types.ObjectId;
  password: string;
  name: TUserName;
  email: string;
  gender: "male" | "female" | "other";
  dateOfBirth?: Date;
  contactNo: string;
  emergencyContactNo: string;
  BloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAdress: string;
  permanentAdress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isDeleted:boolean;
};

//for creating static
export interface StudentModel extends Model<TStudent> {
  isUserExists (id: string):Promise<TStudent | null>
}




