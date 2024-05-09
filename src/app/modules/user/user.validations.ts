import { Gender, UserStatus } from '@prisma/client';
import { z } from 'zod';

// const createDoctor = z.object({
//   password: z.string(),
//   doctor: z.object({
//     email: z.string().email(),
//     name: z.string(),
//     contactNumber: z.string(),
//     address: z.string().nullable(),
//     registrationNumber: z.string(),
//     experience: z.number().int(),
//     gender: z.enum(['MALE', 'FEMALE']),
//     apointmentFee: z.number(),
//     qualification: z.string(),
//     currentWorkingPlace: z.string(),
//     designation: z.string(),
//   })
// });

const createNewAdmin = z.object({
  password: z.string(),
  admin: z.object({
    name: z.string(),
    email: z.string().email(),
    address: z.string(),
    gender: z.enum(['MALE', 'FEMALE']),
    qualification: z.string(),
    maritalStatus: z.enum(['MARRIED', 'UNMARRIED']),
    contactNumber: z.string().optional(),
  }),
});
const createEmployee = z.object({
  password: z.string(),
  employee: z.object({
    name: z.string(),
    email: z.string(),
    address: z.string(),
    gender: z.enum(['MALE', 'FEMALE']),
    qualification: z.string(),
    maritalStatus: z.enum(['MARRIED', 'UNMARRIED']),
   
    designation: z.enum([
      'HEAD_OF_SELLS',
      'SELLS_MANAGER',
      'STORE_MANAGER',
    ]),
    contactNumber: z.string().optional(),
    dob: z.string(),
  }),
});

const createPatient = z.object({
  password: z.string(),
  patient: z.object({
    email: z.string().email(),
    name: z.string(),
    contactNumber: z.string({
      required_error: 'Contact number is required!',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
  }),
});
const createSubscriber = z.object({
  password: z.string(),
  subscriber: z.object({
    email: z.string().email(),
    name: z.string(),
    contactNumber: z.string({
      required_error: 'Contact number is required!',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'ACTIVE', 'BLOCKED']),
  }),
});

export const UserValidation = {
  createNewAdmin,
  createPatient,
  updateStatus,
  createSubscriber,
  createEmployee
};
