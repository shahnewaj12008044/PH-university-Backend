import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
        invalid_type_error: "Password has to be string"
    })
    .max(20, { message: "Password can't be more than 20 chars" }).optional(),
  
  
 
 
});

export const userValidation = {
    userValidationSchema,
}
