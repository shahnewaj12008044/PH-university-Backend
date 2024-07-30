import express from 'express';
import { UserControllers } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validationRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';

//importing router from  expressd
const router = express.Router();

router.post(
  '/create-student',
  validationRequest(createStudentValidationSchema),
  UserControllers.createStudent
);
router.post(
  '/create-faculty',
  validationRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);
router.post(
  '/create-admin',
  validationRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);

export const UserRoutes = router;
