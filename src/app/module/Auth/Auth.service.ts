import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './Auth.interface';
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payload.id);
  // console.log(user)
  //checking if the user is exist
  //   console.log(user)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!!!');
  }
  //checing if the user is dieleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This User is Deleted Already');
  }
  //cheking if the user is blocked
  const status = user?.status;
  if (status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!!!');
  }
  //   console.log(user)
  //   console.log(payload)
  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );
  //   console.log(payload.password)
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'wrong password');
  }

  //matching user password by static method

  // if(!(await User.isPassWordMatched(payload?.password, user?.password))){
  //     throw new AppError(httpStatus.FORBIDDEN,"wrong password")
  // }
  //if access granted: send access token and refresh token
  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.isUserExistByCustomId(userData.id);
  // console.log(user)
  //checking if the user is exist
  //   console.log(user)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!!!');
  }
  // console.log(user,userData)
  //checing if the user is dieleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This User is Deleted Already');
  }
  //cheking if the user is blocked
  const status = user?.status;
  if (status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!!!');
  }
  //   console.log(user)
  //   console.log(payload)
  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.oldPassword,
    user?.password
  );
  // console.log(isPasswordMatched)
  //   console.log(payload.password)
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'wrong password');
  }

  //hash befare set the new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      id: userData.id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  // { id: userData.id, role: userData.role },
  //   { password: newHashedPassword,
  //     needsPasswordChange:false
  //    }

  return null;
};

export const AuthServices = {
  loginUserIntoDB,
  changePasswordIntoDB,
};
