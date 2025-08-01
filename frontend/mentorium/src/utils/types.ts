export type Lecturer = {
  id: string
  firstname: string
  lastname: string
  title: string
  department: string
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

export type Task = {
  id: string
  firstName: string
  lastName: string
  title: string
  department: string
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