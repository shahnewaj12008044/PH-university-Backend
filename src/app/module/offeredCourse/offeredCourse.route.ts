import express from 'express'
import { OfferedCourseController } from './offeredCourse.controller';
import validationRequest from '../../middlewares/validateRequest';
import { offeredCourseValidation } from './offeredCourse.validation';
const router = express.Router();

router.post('/create-offered-course',validationRequest(offeredCourseValidation.createOfferedCourseSchema),OfferedCourseController.createOfferedCourse);

router.patch('/:id',validationRequest(offeredCourseValidation.updateOfferedCourseValidation),OfferedCourseController.updateOfferedCourse);

router.get('/',OfferedCourseController.getAllOfferedCourse)
router.get('/:id',OfferedCourseController.getSingleOfferedCourse)
router.delete('/:id',OfferedCourseController.deleteSingleOfferedCourse)


export const OfferedCourseRouter = router;