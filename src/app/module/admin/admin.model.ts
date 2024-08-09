import { model, Schema } from 'mongoose';
import { AdminModel, TAdmin, TUserName } from './admin.interface';
import { BloodGroup, Gender } from './admin.constant';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AppError from '../../errors/AppError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import httpStatus from 'http-status-codes';

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'firstName is Required!'],
    trim: true,
    maxlength: [20, 'firstName can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [20, 'LastName can not be more than 20 characters!'],
    required: [true, 'lastName is required!!'],
  },
});

const AdminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: [true, 'id is required!!'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user is required'],
      unique: true,
      ref: 'User',
    },
    name: UserNameSchema,
    designation: {
      type: String,
      required: [true, 'designation is required!!'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required!!'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'contactNumber is required!!'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Number is required!!!'],
    },
    bloodGroup: BloodGroup,
    presentAdress: {
      type: String,
      required: [true, 'Present Adress is required!!'],
    },
    permanentAdress: {
      type: String,
      required: [true, 'Permanent Adress is required!!'],
    },
    profileImg: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//generating full name
AdminSchema.virtual('fullName').get(function () {
  return (
    this.name?.firstName +
    ' ' +
    this.name?.middleName +
    ' ' +
    this.name?.lastName
  );
});

// filter out deleted documents
AdminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

AdminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

AdminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//This will be done after some time

AdminSchema.pre('findOneAndUpdate', async function(next){
  const query = this.getQuery();

  const isAdmin = await Admin.findOne(query);
  // console.log(isAdmin)
  if( !isAdmin || isAdmin.isDeleted){
    throw new AppError(httpStatus.BAD_REQUEST,
      'This Faculty is already deleted or does not exist')
  }
  next()
})

AdminSchema.statics.isUserExist = async function(id: string){
  const existingUser = Admin.findOne({id});
    return existingUser;
  
}

export const Admin = model<TAdmin, AdminModel>('Admin', AdminSchema);
