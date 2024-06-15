import { Schema, model } from 'mongoose';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: AcademicSemesterName,
    required: [true, 'Semester Name is required'],
  },
  code: {
    type: String,
    enum: AcademicSemesterCode,
    required: [true, 'Semester code is required'],
  },
  year: {
    type: String,
    required: [true, 'Date is required'],
  },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
},{
    timestamps: true,
});

//validation for same semester in a same year
academicSemesterSchema.pre('save', async function(next){
    const isSemesterExist = await AcademicSemester.findOne({
      name: this.name,
      year: this.year,
    })

    if(isSemesterExist){
      throw new Error("The semester already exist!!!")
    }
    next()
})


export const AcademicSemester= model<TAcademicSemester>('AcademicSemester',academicSemesterSchema) 