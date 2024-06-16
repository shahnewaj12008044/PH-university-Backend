import { AcademicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

//create semester in to db
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //semester nam and code validation
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code!');
  }
  const result = AcademicSemester.create(payload);
  return result;
};

//get all semester data from db
const getAllAcademicSemestersFromDB = async()=>{
    const result  = await AcademicSemester.find();
    // console.log(result)
    return result;
}

//get single semester data from db
const getSingleAcademicSemesterFromDB = async(id : string) =>{
    const result = await AcademicSemester.findOne({_id : id});
    // console.log(result)
    return result;
}

//update single semester data from db:
const updateAcademicSemesterIntoDB = async (id: string, payload: Partial<TAcademicSemester>)=>{
    if(payload.name &&
        payload.code && 
        AcademicSemesterNameCodeMapper[payload.name] !== (payload.code)
    ){
        throw new Error('Invalid semester ID')
    }

    const result = await AcademicSemester.findOneAndUpdate({_id:id},payload,{new:true})
    return result;
}


export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
   getAllAcademicSemestersFromDB,
 getSingleAcademicSemesterFromDB,
 updateAcademicSemesterIntoDB,
 
};
