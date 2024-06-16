import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { AcademicSemesterValidations } from "./academicSemester.validation";
import validationRequest from '../../middlewares/validateRequest';

const router = Router();

//
router.post('/create-academic-semester',validationRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),AcademicSemesterControllers.createAcademicSemester);

router.get('/',AcademicSemesterControllers.getAllAcademicSemesters),
router.get('/:semesterId',AcademicSemesterControllers.getSingleAcademicSemester)

router.patch('/:semesterId',validationRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),AcademicSemesterControllers.updateSingleAcademicSemester)


export const AcademicSemesterRoute = router;