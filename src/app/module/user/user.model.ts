import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from "bcrypt";
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
      select:0,//it wont be shown in any query
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,

    },
    passwordChangedAt:{
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  //hashing password and save into DB:
   //crurrent processed document
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//post save middleware/hooks:
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return  await User.findOne({id}).select('+password')
}

userSchema.statics.isPassWordMatched = async function(plainTextPasword, hashedPassword){
  return  await bcrypt.compare(plainTextPasword, hashedPassword)
}

export const User = model<TUser,UserModel>('User', userSchema);
