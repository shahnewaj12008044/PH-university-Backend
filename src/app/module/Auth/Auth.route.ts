import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './Auth.validation';
import { AuthController } from './Auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validationRequest(AuthValidations.loginValidationSchema),
  AuthController.loginUser
);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validationRequest(AuthValidations.changePasswordValidationSchema),
  AuthController.changePassword
);
router.post(
  '/refresh-token',
  validationRequest(AuthValidations.refreshTokenValidationSchema),
  AuthController.refreshToken
);

export const AuthRouters = router;
