import { Router } from 'express';
import { UserRoutes } from '../module/user/user.route';
import { studentRoutes } from '../module/student/student.route';
import { AcademicSemesterRoute } from '../module/academicSemester/academicSemester.route';
import { AcademicFacultyRoute} from '../module/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../module/academicDepartment/academicDepartment.route';
import { facultyRoutes } from '../module/faculty/faculty.route';
import { adminRoutes } from '../module/admin/admin.route';
import { CourseRoutes } from '../module/faculty/course.route';

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
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoute,
  },
];

moduleRouter.forEach(route => router.use(route.path,route.route))

export default router;
