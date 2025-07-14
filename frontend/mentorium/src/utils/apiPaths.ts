export const BASE_URL = 'http://localhost:8000';

export const API_PATHS = {
    AUTH : {
        REGISTER:"/api/auth/register",
        LOGIN:"/api/auth/login",
        GET_PROFILE:"/api/auth/profile",
    },

    USERS: {
        GET_ALL_USERS:"/api/users",
        GET_USER_BY_ID:(userId: any) =>`/api/users/${userId}`,
        UPDATE_USER:(userId: any) =>`/api/users/${userId}`,
        DELETE_USER: (userId: any) =>`/api/users/${userId}`,
    },

    TASKS:{
        
        CREATE_TASK:`/api/tasks`,
        DELETE_TASK: (taskId: any)=> `/api/tasks/${taskId}`,
        UPDATE_TASK: (taskId: any)=> `/api/tasks/${taskId}`,
        GET_TASK_BY_ID: (taskId: any) => `/api/tasks/${taskId}`,
        GET_ALL_TASKS:`/api/tasks`,
        UPDATE_TASK_STATUS: (taskId: any) => `/api/task/${taskId}`,
    },

    PROJECTS: {
        //empty
    },

    REPORTS: {
        //empty
    },

    ARCHIVES:{
        //empty
    }
}