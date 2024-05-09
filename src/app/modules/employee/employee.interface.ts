export type IEmployeeFilterRequest = {
    searchTerm?: string | undefined;
    email?: string | undefined;
    contactNo?: string | undefined;
    gender?: string | undefined;
    branch?: string | undefined;
    qualification?:string | undefined;
    designation?:string | undefined
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

  interface IEmployee {
  
    email: string;
    name: string;
    dob: string; // Assuming date of birth is stored as a string
    gender: 'MALE' | 'FEMALE';
    maritalStatus: 'MARRIED' | 'UNMARRIED';
    profilePhoto: string;
    contactNumber: string;
    emergencyContactName: string | null;
    address: string;
    designation: 'HEAD_OF_SELLS' | 'SELLS_MANAGER' | 'STORE_MANAGER';
    experience: number;
    qualification: string;
    joining_date: string | null; // Assuming joining date is stored as a string
    salary: number;
    resigning_date: string | null; // Assuming resigning date is stored as a string
    bankAccountNumber: string | null;
    bankName: string | null;
    isDeleted: boolean;
    userId: string;
   
  }
  
  
  export type ISpecialties = {
    specialtiesId: string;
    isDeleted?: null;
  };
  