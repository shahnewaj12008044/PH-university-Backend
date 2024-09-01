import express from 'express';
import { UserControllers } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validationRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

//importing router from  expressd
const router = express.Router();

router.post(
  '/create-student',auth(USER_ROLE.admin),
  validationRequest(createStudentValidationSchema),
  UserControllers.createStudent
);
router.post(
  '/create-faculty',auth(USER_ROLE.admin),
  validationRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);
router.post(
  '/create-admin',//auth(SUPER_ADMIN)
  validationRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);

export const UserRoutes = router;
