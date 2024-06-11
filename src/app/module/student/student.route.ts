import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

//will call controller function
// router.post("/create-student", StudentController.createStudent);
router.get("/", StudentController.getAllStudents);
router.get("/:studentId", StudentController.getAstudent);
router.delete("/:studentId", StudentController.deleteAStudent);
//changes will be on module 9 branch


export const studentRoutes = router;
