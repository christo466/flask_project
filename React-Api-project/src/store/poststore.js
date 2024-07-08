import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getShopeData  } from "../api/postShopeData";

const initialState = {
  status: "idle",

  data: [],
  
};

export const postshopeData = createAsyncThunk("shopeDatapost",
   
   async ({data,successCB,errorCB}) => {
  const response = await getShopeData (data,successCB,errorCB);
  console.log(response.data, "response");
  return response?.data;
});

const ShopePostSlice = createSlice({
  name: "shopeData",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postshopeData.pending, (state) => {
        console.log("pending");
        state.status = "loading";
      })
      .addCase(postshopeData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action, "Action");
        
        
      })
      .addCase(postshopeData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default ShopePostSlice.reducer;




