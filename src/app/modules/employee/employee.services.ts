import { Doctor, Employee, Prisma, Specialties, User, UserStatus } from '@prisma/client';
import prisma from '../../../shared/prisma';

import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';

import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { asyncForEach } from '../../../shared/utils';
import { IEmployeeFilterRequest, IEmployeeUpdate } from './employee.interface';
import { employeeFilterableFields, employeeSearchableFields } from './employee.constants';

const insertIntoDB = async (data: Doctor): Promise<Doctor> => {
  const result = await prisma.doctor.create({
    data,
  });
  return result;
};

// const getAllFromDB = async (
//   filters: IDoctorFilterRequest,
//   options: IPaginationOptions,
// ): Promise<IGenericResponse<Doctor[]>> => {
//   const { limit, page, skip } = paginationHelpers.calculatePagination(options);
//   const { searchTerm, ...filterData } = filters;

//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       OR: doctorSearchableFields.map(field => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }

//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map(key => ({
//         [key]: {
//           equals: (filterData as any)[key],
//         },
//       })),
//     });
//   }

//   andConditions.push({
//     isDeleted: false,
//   });

//   const whereConditions: Prisma.DoctorWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};

//   const result = await prisma.doctor.findMany({
//     where: whereConditions,
//     skip,
//     take: limit,
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? { [options.sortBy]: options.sortOrder }
//         : {
//           averageRating: 'desc'
//         },
//     include: {
//       review: {
//         select: {
//           rating: true
//         }
//       }
//     }
//   });
//   const total = await prisma.doctor.count({
//     where: whereConditions,
//   });

//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };

const getAllFromDB = async (
  filters: IEmployeeFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Employee[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, branch, ...filterData } = filters;

  const andConditions: Prisma.EmployeeWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: employeeSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

//   if (branch) {
//     // Corrected specialties condition
//     andConditions.push({
//       : {
//         some: {
//           specialties: {
//             title: {
//               contains: specialties,
//               mode: 'insensitive',
//             },
//           },
//         },
//       },
//     });
//   }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map(key => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));
    andConditions.push(...filterConditions);
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.EmployeeWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.employee.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
    include: {
      branch:true,
      purchase:true
    
    },
  });

  const total = await prisma.employee.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Employee | null> => {
  console.log(id);
  const result = await prisma.employee.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
    
  });
  console.log(result);
  return result;
};

// const updateIntoDB = async (
//   id: string,
//   payload: Partial<IEmployeeUpdate>,
// ): Promise<Doctor | null> => {
  
//   await prisma.$transaction(async transactionClient => {
//     const result = await transactionClient.employee.update({
//       where: {
//         id,
//       },
//       data: payload,
//     });
   
    

//     return result;
//   });

//   const responseData = await prisma.doctor.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       doctorSpecialties: {
//         include: {
//           specialties: true,
//         },
//       },
//     },
//   });
//   return responseData;
// };




const updateIntoDB = async (
  id: string,
  payload: Partial<Employee>,
): Promise<Employee | User> => {
  const employee = await prisma.employee.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This employee does not exist');
  }
  // const result = await prisma.admin.update({
  //   where: {
  //     id,
  //     isDeleted: false,
  //   },
  //   data: payload,
  // });

  const result = await prisma.$transaction(async tx => {
    const updateAdmin = await tx.employee.update({
      where: {
        id,
        isDeleted: false,
      },
      data: payload,
    });

    if(payload.email){
      await tx.user.update({
        where:{
          id:updateAdmin.userId
        },
        data:{
          email:payload.email
        }
      })
    }
    return updateAdmin
  });

  return result
};


const deleteFromDB = async (id: string): Promise<Employee> => {
  return await prisma.$transaction(async transactionClient => {
    const deleteEmployee = await transactionClient.employee.delete({
      where: {
        id,
      },
    });

    await transactionClient.user.delete({
      where: {
        email: deleteEmployee.email,
      },
    });

    return deleteEmployee;
  });
};

const softDelete = async (id: string): Promise<Employee> => {
  return await prisma.$transaction(async transactionClient => {
    const deleteEmployee = await transactionClient.employee.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: deleteEmployee.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return deleteEmployee;
  });
};

export const EmployeeService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDelete,
};
