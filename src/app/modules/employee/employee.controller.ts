import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { employeeFilterableFields } from './employee.constants';
import { EmployeeService } from './employee.services';


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, employeeFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await EmployeeService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee retrieval successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor retrieval successfully',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  console.log(payload);
  const { ...doctorData } = payload;
  const result = await DoctorService.updateIntoDB(id, doctorData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor deleted successfully',
    data: result,
  });
});
const softDelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorService.softDelete(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor soft deleted successfully',
    data: result,
  });
});

export const EmployeeController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDelete,
};
