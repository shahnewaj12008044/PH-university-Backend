import { z } from 'zod';
import { Days } from './offeredCourse.constants';

const timeStringSchema =  z.string().refine((time) =>{
  const regex = /^(?:[01][0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(time);
},{
  message:'Invalid time format, expected "HH:MM" in 24 hours format'
})

const createOfferedCourseSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number().int().positive(),
    section: z.number().int().positive(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
  }).refine((body) =>{
    const start = new Date(`2001-10-06T${body.startTime}:00`)
    const end = new Date(`2001-10-06T${body.endTime}:00`)

    return end > start
  },{message: "Start Time should be before End Time"}),
});

const updateOfferedCourseValidation = z.object({
 body:z.object({
  faculty: z.string(),
  maxCapacity: z.number().int().positive(),
  section: z.number().int().positive(),
  days: z.array(z.enum([...Days] as [string, ...string[]])),
  startTime: timeStringSchema,
  endTime:timeStringSchema,
 }).refine((body) =>{
  const start = new Date(`2001-10-06T${body.startTime}:00`)
  const end = new Date(`2001-10-06T${body.endTime}:00`)

  return end > start
},{message: "Start Time should be before End Time"}),
});

export const offeredCourseValidation = {
  createOfferedCourseSchema,
  updateOfferedCourseValidation,
};
