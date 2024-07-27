import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";

export const fetchEmployees = createAsyncThunk("employees", async () => {
  const responseData = await fetch(`${config.apiUrl}/employees`);
  const employeesList = await responseData.json();
  return employeesList;
});

const employeesSlice = createSlice({
  name: "employees",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default employeesSlice.reducer;
