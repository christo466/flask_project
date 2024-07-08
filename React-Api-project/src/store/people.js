import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../api/peopleData";

const initialState = {
  status: "idle",

  data: [],
};

export const getPeopleData = createAsyncThunk("peopleDatagetter", async () => {
  const response = await postData();
  console.log(response, "response");
  
  return response?.data;
});

const PeopleDataSlice = createSlice({
  name: "peopleData",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPeopleData.pending, (state) => {
        console.log("pending");
        state.status = "loading";
      })
      .addCase(getPeopleData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action, "Action");
        state.data = action.payload;
        
      })
      .addCase(getPeopleData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default PeopleDataSlice.reducer;
