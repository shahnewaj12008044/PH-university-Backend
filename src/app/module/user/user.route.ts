import express from 'express';
import { UserControllers } from './user.controller';
import {createStudentValidationSchema} from '../student/student.validation'
import validationRequest from '../../middlewares/validateRequest';

//importing router from  expressd
const router = express.Router();


router.post(
  '/create-student',
  validationRequest(createStudentValidationSchema),
  UserControllers.createStudent
);

export const UserRoutes = router;
