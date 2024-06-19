import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Academic department is required!!'],
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  }
);

//departmet unique varify middleware
AcademicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new Error('This department is already exist!!!');
  }
  next();
});

//update validation schema
AcademicDepartmentSchema.pre('findOneAndUpdate',async function(next){
    const query = this.getQuery();

    const isDepartmentExist = await AcademicDepartment.findOne(query);
    if(!isDepartmentExist){
        throw new Error("This Department does not exist!! please input an existing department")
    }
    next()
})



export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema
);
