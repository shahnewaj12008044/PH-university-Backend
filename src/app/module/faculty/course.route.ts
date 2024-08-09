import { Router } from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { CourseValidations } from '../Course/course.validation';
import { CourseControllers } from '../Course/course.controller';

const router = Router();

router.post(
  '/create-course',
  validationRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);

router.get('/', CourseControllers.getAllCourses);
router.get('/:courseId', CourseControllers.getSingleCourse);
//assigning faculties with courses:
router.put(
  '/:courseId/assign-faculties',
  validationRequest(
    CourseValidations.facultiesWithCourseValidationSchema
  ),
  CourseControllers.assignFacultiesWithCourse
);
router.delete(
  '/:courseId/remove-faculties',
  validationRequest(
    CourseValidations.facultiesWithCourseValidationSchema
  ),
  CourseControllers.removeFacultiesFromCourse
);

router.patch(
  '/:courseId',
  validationRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateSingleCourse
);

router.delete('/:courseId', CourseControllers.deleteSingleCourse);

export const CourseRoutes = router;
