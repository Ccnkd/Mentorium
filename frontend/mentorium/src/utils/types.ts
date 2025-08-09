  export type Lecturer = {
    user_id: string
    firstname: string
    lastname: string
    title: string
    department: string
    email: string;
    panel_id: string | null;
    users: {
      firstname: string;
      lastname: string;
      email: string;
    };
  }

  export type Student = {
    user_id: string;
    index_number: string;
    department: string;
    student_id: string;
    current_cwa: number;
    mentee_group_id:string;
    year_of_admission: number;
    users: {
      firstname: string;
      lastname: string;
      email: string;
    };
  };

  export type Panel = {
    id: string
    name: string
    venue: string
    lecturers: Lecturer[]
  }

  export type MenteeGroup = {
    id: string;
    name: string;
    mentor: {
      user_id: string;
      title: string;
      department: string;
      firstname: string;
      lastname: string;
    };
    students: {
      user_id: string;
      firstname: string;
      lastname: string;
      index_number: string;
      department: string;
      year_of_admission: number;
    }[];
  };

  export type ProjectGroup = {
    project_group_id: string
    project_group_name: string
    mentee_group_id:string
    defense_id: string
    approval_status: string
    project_id : string
    members: Member[]
  }

  export type Member={
      user_id: string
      firstname: string
      lastname: string
      email:string
  }
  export type Announcement = {
    announcement_id?: string;
    title: string;
    description?: string;
    created_at?: string;
    created_by: string;

    lecturer: {
      title: string;
      users: {
        firstname: string;
        lastname: string;
      };
    };

    assignees: Announcement_Assignee[];
  };


export type Announcement_Assignee = {
  assignee_id: string;
  users: {
    firstname: string;
    lastname: string;
  };
};

  export type Task = {
    task_id: string;
    project_id?: string;
    title: string;
    description?: string;
    due_date?: string;
    is_completed: boolean;
    is_favorite?: boolean;
    progress?: number;
    priority?: string;
    created_by: {
      user_id: string;
      firstname: string;
      lastname: string;
    };
    assignees: {
      user_id: string;
      users: {
        firstname: string;
        lastname: string;
      };
    }[];
  };

export type Subtask = {
  id: string
  title: string
  is_completed: boolean
}

  export type Project = {
    project_id: string;
    title: string;
    description?: string;
    due_date?: string;
    is_completed: boolean;
    is_final_year_project: boolean;
    is_favorite?: boolean;
    progress?: number;
    priority?: string;
    project_group:{
      id: string;
      title: string;
    }
    created_by: {
      user_id: string;
      firstname: string;
      lastname: string;
    };
    assignees: {
      user_id: string;
      users: {
        firstname: string;
        lastname: string;
      };
    }[];
  };

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