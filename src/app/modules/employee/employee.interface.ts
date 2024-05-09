export type IEmployeeFilterRequest = {
  searchTerm?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
  gender?: string | undefined;
  branch?: string | undefined;
  qualification?: string | undefined;
  designation?: string | undefined;
};

export type IDoctorUpdate = {
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: 'MALE' | 'FEMALE';
  apointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  specialties: ISpecialties[];
};

export interface IEmployeeUpdate {
  email: string;
  name: string;
  gender: 'MALE' | 'FEMALE';
  maritalStatus: 'MARRIED' | 'UNMARRIED';
  profilePhoto: string;
  contactNumber: string;
  emergencyContactNumber: string | null;
  address: string;
  designation: 'HEAD_OF_SELLS' | 'SELLS_MANAGER' | 'STORE_MANAGER';
  experience: number;
  qualification: string;
  joing_date: string | null;
  salary: number;
  resigning_date: string | null;
  bankAccountNumber: string | null;
  bankName: string | null;
}

export type ISpecialties = {
  specialtiesId: string;
  isDeleted?: null;
};
