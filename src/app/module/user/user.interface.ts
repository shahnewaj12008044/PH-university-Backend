import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
    id : string;
    password : string;
    needsPasswordChange: boolean;
    passwordChangedAt:Date;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser>{
    isUserExistByCustomId(id:string):Promise<TUser>;
    isPassWordMatched(plainTextPasword:string, hashedPassword: string): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(passwordChangedTimeStamp:Date, jwtIssuedAt:number):Promise<boolean>
}