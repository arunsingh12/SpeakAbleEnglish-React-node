import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axiosconfig";


export const fetchAllpackages = createAsyncThunk(
    "packages/fetchAllpackages",
    async () => {
      const response = await axios.get(`getpackages`);
    //   console.log(response)
      return response.data;
    }
);
  
export const Delete_Package = createAsyncThunk(
    "packages/Delete_Package",
    async (id) => {
      const response = await axios.get(`Delete_Package/${id}`);
      console.log(response)
      return response.data;
    }
);
 

export const CreatePackage = createAsyncThunk(
    "packages/CreatePackage",
    async (formdata) => {
      // console.log(formdata)
      const response = await axios.post(`Add_Package`, formdata);
    //   console.log(response)
      return response.data;
    }
);

export const updatePackage = createAsyncThunk(
    "packages/updatePackage",
    async ({ PackageID , formData }) => {
        // console.log(formData)
      const response = await axios.post(`Update_Package/${PackageID}`, formData);
    //   console.log(response)
      return response.data;
    }
);

export const fetchPackage = createAsyncThunk(
    "packages/fetchPackage",
    async (PackageID) => { 
      const response = await axios.get(`fetchPackage/${PackageID}`);
      // console.log(response)
      return response.data.package;
    }
);


export const GetPackageByTeacherID = createAsyncThunk(
  "packages/GetPackageByTeacherID",
  async (TeacherID) => { 
    const response = await axios.get(`GetPackageByTeacherID/${TeacherID}`);
    // console.log(response)
    return response.data.package;
  }
);

// export const GetPackageByStudentID = createAsyncThunk(
//   "packages/GetPackageByStudentID",
//   async (StudentID) => { 
//     const response = await axios.get(`GetPackageByStudentID/${StudentID}`);
//     console.log(response)
//     return response.data.package;
//   }
// );

export const MakePayment = createAsyncThunk(
  "packages/MakePayment",
  async (data) => { 
    const response = await axios.post(`Make-Payment`,data);
    // console.log(response)
    // return response.data.hash    ;
  }
);



export const Search_Free_Package = createAsyncThunk(
  "packages/Search_Free_Package",
  async() => {
    try {
      const response = await axios.get("Search_Free_Package")
      // console.log(response)
      return response
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
)

// SearchPackagebyPackageName
export const SearchPackagebyPackageName = createAsyncThunk(
  "packages/SearchPackagebyPackageName",
  async(input) => {
    try {
      const response = await axios.post(`SearchPackagebyPackageName/${input}`)
      // console.log(response)
      return response
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
)




