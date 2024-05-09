import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { EmployeeController } from './employee.controller';

const router = express.Router();

router.get('/', EmployeeController.getAllFromDB);

// router.get('/:id', DoctorController.getByIdFromDB);

// router.post(
//   '/',
//   validateRequest(DoctorValidation.create),
//   DoctorController.insertIntoDB,
// );

// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR),
//   validateRequest(DoctorValidation.update),
//   DoctorController.updateIntoDB,
// );

// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   DoctorController.deleteFromDB,
// );

// router.delete(
//   '/soft/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   DoctorController.softDelete,
// );

export const EmployeeRoutes = router;
