import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const AcademicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type:String,
        required:[true,"Academic faculty is required!!"],
        unique:true,
    },
} ,{
    timestamps: true,
  })

export const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculty',AcademicFacultySchema)