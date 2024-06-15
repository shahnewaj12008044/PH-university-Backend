import { AcademicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester)=>{
    //semester nam and code validation
   

   
    if(AcademicSemesterNameCodeMapper[payload.name] !== (payload.code)){
        throw new Error("Invalid Semester Code!")
    }


    const result = AcademicSemester.create(payload);
    return result;
}


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
}