import express from 'express';
import { AdminControllers } from './admin.controller';



const router = express.Router();

router.get('/',AdminControllers.getAllAdmins);

router.get('/:adminId',AdminControllers.getSingleAdmin);

router.patch('/:adminId',AdminControllers.updateSingleAdmin);

router.delete('/:adminId', AdminControllers.deleteAdmin)