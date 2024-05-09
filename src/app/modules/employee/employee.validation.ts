import { z } from 'zod';



const updateEmployee = z.object({
  body: z.object({
    email: z.string().email().optional(),
    name: z.string(),
    gender: z.enum(['MALE', 'FEMALE']).optional(),
    maritalStatus: z.enum(['MARRIED', 'UNMARRIED']).optional(),
    profilePhoto: z.string().optional(),
    contactNumber: z.string().optional(),
    emergencyContactNumber: z.string().nullable().optional(),
    address: z.string().optional(),
    designation: z.enum(['HEAD_OF_SELLS', 'SELLS_MANAGER', 'STORE_MANAGER']).optional(),
    experience: z.number().optional(),
    qualification: z.string().optional(),
    joining_date: z.string().nullable().optional(),
    salary: z.number().optional(),
    resigning_date: z.string().nullable().optional(),
    bankAccountNumber: z.string().nullable().optional(),
    bankName: z.string().nullable().optional(),
  }),
});



export const EmployeeValidation = {
 updateEmployee,

};
