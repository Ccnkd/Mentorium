export type Lecturer = {
  id: string
  firstname: string
  lastname: string
  title: string
  department: string
  email: string;
  panel_id: string | null;
}

export type Panel = {
  id: string
  name: string
  lecturers: Lecturer[] // ✅ This should now work correctly
}

export type ProjectGroup = {
  id: string
  name: string
  students: Student[]
}

export type Announcement = {
  announcement_id: string
  title: string
  description: string
  created_at: string
  created_by: string
  lecturer: {
    title: string
    firstname: string
    lastname: string
  }
  assignees: Assignee []
}

export type Assignee = {
  assignee_id: string
}

export type Task = {
  task_id: string
  project_id: string
  title: string
  description: string
  due_date: string
  is_completed: boolean
  is_favorite: boolean
  progress: number
  priority: number
  subtasks: Subtask []
}

export type Subtask = {
  id: string
  title: string
  is_completed: boolean
}

export type Project = {
  id: string
  firstName: string
  lastName: string
  title: string
  department: string
}

export type Student = {
  id: string
  firstName: string
  lastName: string
  title: string
  department: string
}

export type Coordinator = {
  id: string
  firstName: string
  lastName: string
  title: string
  department: string
}