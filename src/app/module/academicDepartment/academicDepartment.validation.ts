import { z } from "zod";


const createAcademicDepartmentValidationShcema =z.object({
    body: z.object({
        name:z.string({
            invalid_type_error:'academic department must be string'
        }),
        academicFaculty:z.string({invalid_type_error:"academic department must be string"})
    })
})
const updateAcademicDepartmentValidationShcema =z.object({
    body: z.object({
        name:z.string({
            invalid_type_error:'academic department must be string'
        }).optional(),
        academicFaculty:z.string({invalid_type_error:"academic department must be string"}).optional()
    })
})

export const AcademicDepartmentValidtions = {
    createAcademicDepartmentValidationShcema,
    updateAcademicDepartmentValidationShcema,
}