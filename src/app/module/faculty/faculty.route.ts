import express from "express";
import { FacultyController } from "./faculty.controller";
import validationRequest from "../../middlewares/validateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const router = express.Router();

//will call controller function
router.get("/",auth(USER_ROLE.admin,USER_ROLE.faculty), FacultyController.getAllFaculties)
router.get("/:facultyId", FacultyController.getSingleFaculty);

router.patch("/:facultyId",validationRequest(updateFacultyValidationSchema), FacultyController.upadateSingleFaculty);

router.delete("/:facultyId", FacultyController.deleteSingleFaculty);
//changes will be on module 9 branch


export const facultyRoutes = router;
