import { z } from "zod";

const AcademicFacultyValidationShcema =z.object({
    body: z.object({
        name:z.string({
            invalid_type_error:'academic faculty must be string'
        })
    })
})

export const AcademicFacultyValidtions = {
    AcademicFacultyValidationShcema,
}