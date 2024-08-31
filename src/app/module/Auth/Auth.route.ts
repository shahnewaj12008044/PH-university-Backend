import express from "express"
import validationRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./Auth.validation";
import { AuthController } from "./Auth.controller";

const router = express.Router();

router.post('/login',validationRequest(AuthValidations.loginValidationSchema),AuthController.loginUser)

export const AuthRouters = router;