import { Router } from "express";
import { AcademicFacultyController } from "./academicFaculty.controller";
import validationRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidtions } from "./academicFaculty.validation";

const router = Router();

router.post('/create-academic-faculty',validationRequest(AcademicFacultyValidtions.AcademicFacultyValidationShcema),AcademicFacultyController.createAcademicFaculty);

router.get('/',AcademicFacultyController.getAllAcademicFaculty);
router.get('/:facultyID',AcademicFacultyController.getSingleAcademicFaculty);

router.patch('/:facultyID',validationRequest(AcademicFacultyValidtions.AcademicFacultyValidationShcema),AcademicFacultyController.updateSingleAcademicFaculty);

export const AcademicFacultyRoute = router;