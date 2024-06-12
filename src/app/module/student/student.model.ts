import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentModel,
  TUserName,
  //StudentMethods,
} from "./student.interface";
import config from "../../config";



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
  password: {
    type: String,
    trim: true,
    required: true,
    kMaxLength: [20, "password cant be more than 20 chars"],
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
  dateOfBirth: { type: String },
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{
  toJSON:{
    virtuals:true
  }
});

studentSchema.pre("save", async function (next) {
  //hashing password and save into DB:
   //crurrent processed document
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//post save middleware/hooks:
studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});





export const Student = model<TStudent, StudentModel>("Student", studentSchema);
