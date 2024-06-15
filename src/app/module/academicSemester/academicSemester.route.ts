import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { AcademicSemesterValidations } from "./academicSemester.validation";
import validationRequest from '../../middlewares/validateRequest';

const router = Router();

//
router.post('/create-academic-semester',validationRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),AcademicSemesterControllers.createAcademicSemester);


export const AcademicSemesterRoute = router;