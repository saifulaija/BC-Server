import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { EmployeeController } from './employee.controller';
import { EmployeeValidation } from './employee.validation';

const router = express.Router();

router.get('/', EmployeeController.getAllFromDB);

router.get('/:id', EmployeeController.getByIdFromDB);

// router.post(
//   '/',
//   validateRequest(DoctorValidation.create),
//   DoctorController.insertIntoDB,
// );

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR),
  validateRequest(EmployeeValidation.updateEmployee),
  EmployeeController.updateIntoDB,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  EmployeeController.deleteFromDB,
);

router.delete(
  '/soft/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  EmployeeController.softDelete,
);

export const EmployeeRoutes = router;
