import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

// Fetch all mentees
export const fetchMentees = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.USERS.GET_MENTEES);
    return response.data?.mentees || []; // Assumes the backend sends { mentees: [...] }
  } catch (error) {
    console.warn("Error fetching mentees:", error);
    return [];
  }
};

// Fetch all students
export const fetchStudents = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.USERS.GET_STUDENTS);
    return response.data.users || []; // Assumes the backend sends { students: [...] }
  } catch (error) {
    console.warn("Error fetching students:", error);
    return [];
  }
};

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
    return response.data?.users || []; // Assumes the backend sends { users: [...] }
  } catch (error) {
    console.warn("Error fetching users:", error);
    return [];
  }
};
