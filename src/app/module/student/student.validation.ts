import { z } from 'zod';

// Username schema
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name cannot be more than 20 characters')
    .min(1, 'First Name is required'),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .regex(/^[A-Za-z]+$/, 'Last Name is not valid')
    .min(1, 'Last Name is required'),
});

// Guardian schema
const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father Name is required'),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().min(1, 'Father Contact number is required'),
  motherName: z.string().trim().min(1, 'Mother Name is required'),
  motherOccupation: z.string().trim().optional(),
  motherContactNo: z.string().trim().min(1, 'Mother Contact No is required'),
});

// Local Guardian schema
const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  occupation: z.string().optional(),
  contactNo: z.string().min(1, 'Contact No is required'),
  address: z.string().min(1, 'Address is required'),
});

// Student schema
export const createStudentValidationSchema = z.object({
  body:z.object({
    password: z.string().max(20),
    student:z.object({
      name: createUserNameValidationSchema,
    gender: z.enum(['male', 'female', 'other'], {
      errorMap: () => ({ message: '{VALUE} is not supported' }),
    }),
    dateOfBirth: z.string().optional(),
    email: z.string().email('Email is not valid').min(1, 'Email is required'),
    contactNo: z.string().min(1, 'Contact no is required'),
    emergencyContactNo: z.string().min(1, 'Emergency Contact No is required'),
    BloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    presentAdress: z.string().min(1, 'Present Address is required'),
    permanentAdress: z.string().min(1, 'Permanent Address is required'),
    guardian: createGuardianValidationSchema,
    localGuardian: createLocalGuardianValidationSchema,
    profileImage: z.string(),
    academicDepartment:z.string(),
    admissionSemester:z.string()
    })
  })
})


//update Username schema
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name cannot be more than 20 characters')
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .regex(/^[A-Za-z]+$/, 'Last Name is not valid')
    .optional(),
});

// Guardian schema
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().trim().optional(),
  motherOccupation: z.string().trim().optional(),
  motherContactNo: z.string().trim().optional(),
});

// Local Guardian schema
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

// Student schema
export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: '{VALUE} is not supported' }),
      }).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Email is not valid').optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      BloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAdress: z.string().optional(),
      permanentAdress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImage: z.string().optional(),
      academicDepartment: z.string().optional(),
      admissionSemester: z.string().optional(),
    }).optional(),
  }),
});

