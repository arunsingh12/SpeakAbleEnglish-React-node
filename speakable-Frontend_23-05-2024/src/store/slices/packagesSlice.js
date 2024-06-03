import { createSlice } from "@reduxjs/toolkit";
import {
  CreatePackage,
  Delete_Package,
  GetPackageByTeacherID,
  SearchPackagebyPackageName,
  Search_Free_Package,
  fetchAllpackages,
  fetchPackage,
  updatePackage,
} from "../actions/packagesActions";
import { toast } from "react-toastify";

let intialState = {
  packageslist: [],
  packageDetails: [],
  currentPackage: [],
  Teacher_Packages: [],
  FreePackage: [],
  loading: false,
};

const packageSlice = createSlice({
  name: "package",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Delete_Package.pending, (state) => {
        state.loading = true;
      })
      .addCase(Delete_Package.fulfilled, (state, action) => {
        console.log(action.payload, "action");
        console.log(state.packageslist, "packageslist");
        state.packageslist = state.packageslist.filter(
          (teacher) => teacher._id !== action.payload.DeletedPackage._id
        );

        state.loading = false;
      })
      .addCase(Delete_Package.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllpackages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllpackages.fulfilled, (state, action) => {
        state.packageslist = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllpackages.rejected, (state) => {
        state.loading = false;
      })
      .addCase(CreatePackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreatePackage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(CreatePackage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updatePackage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchPackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPackage.fulfilled, (state, action) => {
        state.currentPackage = action.payload;
        state.loading = false;
      })
      .addCase(fetchPackage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(GetPackageByTeacherID.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetPackageByTeacherID.fulfilled, (state, action) => {
        state.Teacher_Packages = action.payload;
        state.loading = false;
      })
      .addCase(GetPackageByTeacherID.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Search_Free_Package.pending, (state) => {
        state.loading = true;
      })
      .addCase(Search_Free_Package.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.FreePackage = action.payload.data.FreePackage;
          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(Search_Free_Package.rejected, (state) => {
        state.loading = false;
      })
      .addCase(SearchPackagebyPackageName.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchPackagebyPackageName.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.packageslist = action.payload.data.foundedPackage;
          state.loading = false;
        } else {
          state.packageslist = action.payload.data;
          toast.warning(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(SearchPackagebyPackageName.rejected, (state) => {
        state.loading = false;
      });
    // .addCase(Gethash.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(Gethash.fulfilled, (state, action) => {
    //   state.hash = action.payload
    //   state.loading = false;
    // })
    // .addCase(Gethash.rejected, (state) => {
    //   state.loading = false;
    // })
  },
});

// export const { } = coursesSlice.actions;
export default packageSlice.reducer;
