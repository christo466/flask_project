import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData  } from "../api/shopeData";

const initialState = {
  status: "idle",

  data: [],

};

export const getshopeData = createAsyncThunk("shopeDatagetter", async () => {
  const response = await getData ();
  console.log(response, "response");
  
  return response?.data;
});

const ShopeDataSlice = createSlice({
  name: "shopeData",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getshopeData.pending, (state) => {
        console.log("pending");
        state.status = "loading";
      })
      .addCase(getshopeData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action, "Action");
        state.data = action.payload;
        
      })
      .addCase(getshopeData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default ShopeDataSlice.reducer;
