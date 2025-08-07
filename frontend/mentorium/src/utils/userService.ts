import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

  
  

export const fetchMentees = async() =>{
  try {
    const response = await axiosInstance.get(API_PATHS.USERS.GET_MENTEES);

    if (response.data) {
      return response.data;
    } else {
      return []; // Return empty array if no data
    }
  } catch (error) {
    console.warn("No mentee data received", error);
    return []; // Ensure consistent return type
  }
  }


export const fetchStudents = async() =>{
  try {
    const response = await axiosInstance.get(API_PATHS.USERS.GET_STUDENTS);

    if (response.data.users) {
      return response.data.users;
    } else {
      return []; // Return empty array if no data
    }
  } catch (error) {
    console.warn("No mentee data received", error);
    return []; // Ensure consistent return type
  }
  }

const fetchUsers = async() =>{
  try {
    const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);

    if (response.data.users) {
      return response.data.users;
    } else {
      return []; // Return empty array if no data
    }
  } catch (error) {
    console.warn("No mentee data received", error);
    return []; // Ensure consistent return type
  }
  }