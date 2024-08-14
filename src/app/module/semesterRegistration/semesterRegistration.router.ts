import express from "express"
import { semesterRegistrationValidations } from "./semesterRegistration.validation";
import validationRequest from "../../middlewares/validateRequest";
import { semesterRegistrationController } from "./semesterRegistration.controller";



const router = express.Router();

router.post('/create-semester-registration',validationRequest(semesterRegistrationValidations.createSemesterRegistrationValidationSchema),semesterRegistrationController.createSemesterRegistration)

router.get('/',semesterRegistrationController.getAllSemesterRegistrations)

router.get('/:semesterId',semesterRegistrationController.getSingleSemesterRegistrations)

router.patch('/:semesterId',validationRequest(semesterRegistrationValidations.updateSemesterRegistrationValidationSchema),semesterRegistrationController.updateSingleSemesterRegistrations)

export const semesterRegistrationRouter = router;