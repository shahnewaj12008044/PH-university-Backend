import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';
import httpStatus from 'http-status-codes';

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);

  //response
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admin is retrived successfully',
    data: result,
  });
});


const getSingleAdmin = catchAsync(async(req, res) => {
    const {adminId} = req.params;
    const result = await AdminServices.getSingleAdminFromDB(adminId) ;
    sendResponse(res,{
        status: httpStatus.OK,
        success: true,
        message: "Admin is retrived successfully",
        data: result,
    })
})

//update single admin
const updateSingleAdmin = catchAsync(async(req, res)=>{
    const {adminId} = req.params;
    const {admin} = req.body;
    const result = await AdminServices.updateSingleAdminIntoDB(adminId, admin);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Admin is Updated Successfully",
        data: result,
    })
})

//delete admin 
const deleteAdmin = catchAsync(async(req, res)=>{
    const {adminId} = req.params;
    const result = await AdminServices.deleteAdminFromDB(adminId);

    sendResponse(res,{
        status: httpStatus.OK,
        success: true,
        message: "Admin is Deleted Successfully",
        data: result,
    })
})

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateSingleAdmin,
  deleteAdmin,
};
