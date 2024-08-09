import {z} from 'zod';

const preRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
})

const createCourseValidationSchema = z.object({
    body:z.object({
        title:z.string(),
        prefix: z.string(),
        code: z.number(),
        credit:z.number(),
        isDeleted: z.boolean().optional(),
        preRequisiteCourse: z.array(preRequisiteCourseValidationSchema).optional()
    })
});
const updatepreRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
})

const updateCourseValidationSchema = z.object({
    body:z.object({
        title:z.string().optional(),
        prefix: z.string().optional(),
        code: z.number().optional(),
        credit:z.number().optional(),
        isDeleted: z.boolean().optional(),
        preRequisiteCourse: z.array(updatepreRequisiteCourseValidationSchema).optional()
    })
});

const facultiesWithCourseValidationSchema = z.object({
    body:z.object({
        faculties: z.array(z.string())
    })
})



export const CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    facultiesWithCourseValidationSchema
}