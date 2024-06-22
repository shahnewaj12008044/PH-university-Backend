import { Schema, model } from "mongoose";
import validator from "validator";
import httpStatus from 'http-status-codes';

import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentModel,
  TUserName,
  //StudentMethods,
} from "./student.interface";
import AppError from "../../errors/AppError";




//username schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "First name can not be more than 20 character"], //built-in validator
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

//Guardian schema:
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "First Name is required"] },
  fatherOccupation: { type: String },
  fatherContactNo: {
    type: String,
    required: [true, "Contact number is required"],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, "Mother Name is required"],
  },
  motherOccupation: { type: String, trim: true },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, "Contact No is required"],
  },
});

//LocalGuardian schema;
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Name is required"] },
  occupation: { type: String },
  contactNo: { type: String, required: [true, "Contact No is required"] },
  address: { type: String, required: [true, "Address is required"] },
});



const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, trim: true, required: true, unique: true },
  user:{
    type: Schema.Types.ObjectId,
    require:[true,"User ID is required"],
    unique:true, 
    ref:"User",
  },
  name: {
    type: userNameSchema,
    required: [true, "Name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not supported",
    },
    required: true,
  }, //its called enum
  dateOfBirth: { type: Date },
  email: {
    type: String,
    required: [true, "Email  is required"],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not a valid email type",
    },
  },
  contactNo: { type: String, required: [true, "Contact no is required"] },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency Contact No is required"],
  },
  BloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAdress: {
    type: String,
    required: [true, "Present Address is required"],
  },
  permanentAdress: {
    type: String,
    required: [true, "Permanent Address is required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian info  is required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    require: [true, "Local guardian is required"],
  },
  profileImage: { type: String },
  academicDepartment:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:"AcademicDepartment",
  },
  admissionSemester:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:"AcademicSemester",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{
  toJSON:{
    virtuals:true
  }
});

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});


studentSchema.pre('findOneAndUpdate',async function (next) {
  const  query = this.getQuery();
 const isStudent = await Student.findOne(query)
 if(!isStudent || isStudent.isDeleted){
  throw new AppError(httpStatus.BAD_REQUEST,"This Student is already deleted or does not exist")
  }
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};


export const Student = model<TStudent, StudentModel>("Student", studentSchema);
