import axios from "axios";
import config from "../config";

export const editCafeApi = async (cafe) => {
  console.log(`Editing cafe with id ${cafe.cafe_id}`);
  try {
    await axios.put(`${config.apiUrl}/cafes`, cafe);
    console.log("Edited cafe data in the database.");
  } catch (error) {
    console.log("Database update for cafe failed:", error);
    throw error; 
  }
};

export const addCafeApi = async (cafe) => {
  console.log(`Creating new cafe record`);
  try {
    await axios.post(`${config.apiUrl}/cafes`, cafe);
    console.log("Inserted cafe data into database.");
  } catch (error) {
    console.log("Database update for cafe failed:", error);
    throw error; 
  }
};

export const deleteCafeApi = async (cafeId) => {
  console.log(`Deleteing cafe with id ${cafeId}`);
  try {
    await axios.delete(`${config.apiUrl}/cafes/${cafeId}`);
    console.log(`Deleted cafe with ID ${cafeId} from the database`);
  } catch (error) {
    console.log("Database delete for cafe failed:", error);
    throw error; 
  }
};
