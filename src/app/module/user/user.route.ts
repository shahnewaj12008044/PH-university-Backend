import express from 'express';
import { UserControllers } from './user.controller';


//importing router from  expressd
const router = express.Router();

router.post('/create-student',UserControllers.createStudent);

export const UserRoutes = router;