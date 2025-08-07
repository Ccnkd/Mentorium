export type Lecturer = {
  user_id: string
  firstname: string
  lastname: string
  title: string
  department: string
  email: string;
  panel_id: string | null;
}

export type Student = {
  user_id: string
  index_number : string
  current_cwa : string
  firstname: string
  lastname: string
  year_of_admission : string
}

export type Panel = {
  id: string
  name: string
  venue: string
  lecturers: Lecturer[]
}

export type ProjectGroup = {
  id: string
  name: string
  students: Student[]
}

export type Announcement = {
  announcement_id?: string
  title: string
  description?: string
  created_at?: string
  created_by: string
  lecturer: {
    title: string
    firstname: string
    lastname: string
  }
  assignees: Announcement_Assignee []
}

export type Announcement_Assignee = {
  assignee_id: string
}

export type Task = {
  task_id?: string
  project_id?: string
  title: string
  description?: string
  due_date?: string
  is_completed?: boolean
  is_favorite?: boolean
  progress?: number
  priority?: number
  assignees?: Task_Assignee[]
  subtasks?: Subtask []
}

export type Task_Assignee = {
  assignee_id: string
}

export type Subtask = {
  id: string
  title: string
  is_completed: boolean
}

export type Project = {
  id: string
  title: string
  description: string
  due_date: string
  assignee: Project_Assignee[]
}

export type Project_Assignee = {
  assignee_id: string
  role: "student"
}

export type Coordinator = {
  id: string
  firstName: string
  lastName: string
  title: string
  department: string
}