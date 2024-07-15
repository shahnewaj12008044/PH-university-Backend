import express from "express";
import { FacultyController } from "./faculty.controller";
import validationRequest from "../../middlewares/validateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";


const router = express.Router();

//will call controller function
router.get("/", FacultyController.getAllFaculties);
router.get("/:studentId", FacultyController.getSingleFaculty);

router.patch("/:studentId",validationRequest(updateFacultyValidationSchema), FacultyController.upadateSingleFaculty);

router.delete("/:studentId", FacultyController.deleteSingleFaculty);
//changes will be on module 9 branch


export const studentRoutes = router;
