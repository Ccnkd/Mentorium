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
        GET_MENTEE_GROUPS:"/api/users/menteegroups",
        ASSIGN_MENTEE_GROUPS:"/api/users/assignmenteegroups",
        GET_STUDENTS:"/api/users/students",
        GET_USER_BY_ID:(userId: any) =>`/api/users/${userId}`,
        UPDATE_USER:(userId: any) =>`/api/users/${userId}`,
        DELETE_USER: (userId: any) =>`/api/users/${userId}`,
        PROMOTE_LECTURER: (lecturerId: string) => `/api/users/${lecturerId}/promote`,
    },

    TASKS: {
    CREATE_TASK: `/api/task/createtask`,
    DELETE_TASK: (task_id: string) => `/api/task/${task_id}`,
    UPDATE_TASK: (task_id: any) => `/api/task/${task_id}`,
    GET_TASK_BY_ID: (task_id: any) => `/api/task/${task_id}`,
    GET_ALL_TASKS: `/api/task/gettasks`,
    GET_COMPLETED_TASKS: `/api/task/gettasks?status=completed`,
    GET_PENDING_TASKS: `/api/task/gettasks?status=pending`,
    UPDATE_TASK_STATUS: (task_id: any) => `/api/task/${task_id}/status`,
    UPDATE_TASK_CHECKLIST: (task_id: any) => `/api/task/${task_id}/todo`,
    },

    DEFENSE: {
    CREATE_PANEL: `/api/defense/createPanel`,
    GET_PANELS: `/api/defense/getPanels`,
    DELETE_PANEL: (id: any)=> `/api/defense/${id}/deletePanel`,
    ASSIGN_PANEL: `/api/defense/assignPanel`,
    ASSIGN_PROJECT_GROUPS: `/api/defense/assignProjectgroup`,
    GET_PROJECT_GROUPS:"/api/defense/getProjectgroups",
    DELETE_PROJECT_GROUPS: (id: any)=> `/api/defense/${id}/deleteProjectgroup`,
    CREATE_PROJECT_GROUPS: `/api/defense/createProjectgroup`,
    },

    ANNOUNCEMENT: {
    CREATE: `/api/announcement/createAnnouncement`,
    GET_ANNOUNCEMENTS: `/api/announcement/getAnnouncements`,
    DELETE_ANNOUNCEMENT: (announcementId: any)=> `/api/announcement/${announcementId}/deletePanel`,
    },

    PROJECTS: {
    CREATE_PROJECT: `/api/project/createproject`,
    GET_ALL_PROJECTS: `/api/project/getprojects`,
    DELETE_PROJECTS: (project_id: string) => `/api/project/${project_id}`,
    },

    REPORTS: {
        //empty
    },

    ARCHIVES:{
        //empty
    }
}