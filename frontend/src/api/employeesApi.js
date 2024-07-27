import axios from "axios";
import config from "../config";

export const editEmployeeApi = async (employee) => {
  console.log(`Editing existing employee ${JSON.stringify(employee)}`);
  try {
    await axios.put(`${config.apiUrl}/employees`, employee);
    console.log("Edited employee data in the database");
  } catch (error) {
    console.log("Database update for employee failed:", error);
    throw error; 
  }
};

export const addEmployeeApi = async (employee) => {
  console.log(`Creating new employee record ${JSON.stringify(employee)}`);
  try {
    await axios.post(`${config.apiUrl}/employees`, employee);
    console.log("Inserted employee data into database.");
  } catch (error) {
    console.log("Database update for employee failed:", error);
    throw error; 
  }
};

export const deleteEmployeeApi = async (employeeId) => {
  console.log(`Deleting employee with ID ${employeeId}`);
  try {
    await axios.delete(`${config.apiUrl}/employees/${employeeId}`);
    console.log(`Deleted employee with ID ${employeeId} from the database`);
  } catch (error) {
    console.log("Database delete for employee failed:", error);
    throw error; 
  }
};
