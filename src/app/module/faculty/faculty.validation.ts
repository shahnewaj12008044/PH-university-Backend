import { z } from 'zod';

// Username schema
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name cannot be more than 20 characters')
    .min(1, 'First Name is required')
    .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
      }),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .regex(/^[A-Za-z]+$/, 'Last Name is not valid')
    .min(1, 'Last Name is required'),
});


// Student schema
export const createFacultyValidationSchema = z.object({
  body:z.object({
    password: z.string().max(20),
    faculty:z.object({
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
    profileImg: z.string().optional(),
    academicDepartment:z.string(),
    })
  })
})


//update Username schema
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name cannot be more than 20 characters').refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
      })
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .regex(/^[A-Za-z]+$/, 'Last Name is not valid')
    .optional(),
});


// Student schema
export const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
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
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }).optional(),
  }),
});

