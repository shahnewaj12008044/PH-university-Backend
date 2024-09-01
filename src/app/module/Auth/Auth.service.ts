import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './Auth.interface';
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { createToken } from './Auth.utils';

const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payload.id);

  //checking if the user is exist

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

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

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
  //generating an access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string
  );

  //generating a refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires as string
  );

  return {
    accessToken,
    refreshToken,
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
    }
  );
  // { id: userData.id, role: userData.role },
  //   { password: newHashedPassword,
  //     needsPasswordChange:false
  //    }

  return null;
};



const generateRefreshToken = async (token: string) => {
  //checking if the token is valid or not
  // invalid token

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { id, iat } = decoded;

  const user = await User.isUserExistByCustomId(id);

  //checking if the user is exist

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

  // deactivating the previous token after the password been changed
  if (
    user.passwordChangedAt &&
    (await User.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number
    ))
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You Session has ended!! Please Login again'
    );
  }

  //creatign access token
  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  // console.log("jwtPayload",jwtPayload)
  //generating an access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string
  );
  // console.log(accessToken)

  return { accessToken };
};

export const AuthServices = {
  loginUserIntoDB,
  changePasswordIntoDB,
  generateRefreshToken,
};
