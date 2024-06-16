import { Router } from 'express';
import { UserRoutes } from '../module/user/user.route';
import { studentRoutes } from '../module/student/student.route';
import { AcademicSemesterRoute } from '../module/academicSemester/academicSemester.route';
import { AcademicFacultyRoute} from '../module/academicFaculty/academicFaculty.route';

const router = Router();

// router.use('/user',UserRoutes);
// router.use('/students',studentRoutes)

//another way

const moduleRouter = [
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoute,
  },
];

moduleRouter.forEach(route => router.use(route.path,route.route))

export default router;
