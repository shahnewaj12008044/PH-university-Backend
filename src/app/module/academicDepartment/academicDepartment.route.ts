import { Router } from "express";

import validationRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentController } from "./academicDepartment.controller";
import { AcademicDepartmentValidtions } from "./academicDepartment.validation";


const router = Router();

router.post('/create-academic-department',validationRequest(AcademicDepartmentValidtions.createAcademicDepartmentValidationShcema),AcademicDepartmentController.createAcademicDepartment);

router.get('/',AcademicDepartmentController.getAllAcademicDepartment);
router.get('/:departmentID',AcademicDepartmentController.getSingleAcademicDepartment);

router.patch('/:departmentID',validationRequest(AcademicDepartmentValidtions.updateAcademicDepartmentValidationShcema),AcademicDepartmentController.updateSingleAcademicDepartment);

export const AcademicDepartmentRoute = router;