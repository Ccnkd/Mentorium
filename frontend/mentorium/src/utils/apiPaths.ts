export const BASE_URL = 'http://localhost:8000';

export const API_PATHS = {
    AUTH : {
        REGISTER:"/api/auth/register",
        LOGIN:"/api/auth/login",
        GET_PROFILE:"/api/auth/profile",
    },

    USERS: {
        GET_ALL_USERS:"/api/users",
        GET_LECTURERS:"/api/users/supervisors",
        GET_MENTEES:"/api/users/mentees",
        GET_STUDENTS:"/api/users/students",
        GET_USER_BY_ID:(userId: any) =>`/api/users/${userId}`,
        UPDATE_USER:(userId: any) =>`/api/users/${userId}`,
        DELETE_USER: (userId: any) =>`/api/users/${userId}`,
        PROMOTE_LECTURER: (lecturerId: string) => `/api/users/${lecturerId}/promote`,
    },

    TASKS: {
    CREATE_TASK: `/api/task/createtask`,
    DELETE_TASK: (taskId: any) => `/api/task/${taskId}`,
    UPDATE_TASK: (taskId: any) => `/api/task/${taskId}`,
    GET_TASK_BY_ID: (taskId: any) => `/api/task/${taskId}`,
    GET_ALL_TASKS: `/api/task/gettasks`,
    GET_COMPLETED_TASKS: `/api/task/gettasks?status=completed`,
    GET_PENDING_TASKS: `/api/task/gettasks?status=pending`,
    UPDATE_TASK_STATUS: (taskId: any) => `/api/task/${taskId}/status`,
    UPDATE_TASK_CHECKLIST: (taskId: any) => `/api/task/${taskId}/todo`,
    },

    DEFENSE: {
    CREATE_PANEL: `/api/defense/createPanel`,
    GET_PANELS: `/api/defense/getPanels`,
    DELETE_PANEL: (id: any)=> `/api/defense/${id}/deletePanel`,
    ASSIGN_PANEL: `/api/defense/assignPanel`,
    },

    ANNOUNCEMENT: {
    CREATE: `/api/announcement/createAnnouncement`,
    GET_ANNOUNCEMENTS: `/api/announcement/getAnnouncements`,
    DELETE_ANNOUNCEMENT: (announcementId: any)=> `/api/announcement/${announcementId}/deletePanel`,
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