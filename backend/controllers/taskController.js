const supabase = require('../config/db');

const getTasks = async (req, res) => {
  try {
    const { status } = req.query;   // e.g., "completed", "in-progress"
    const userId = req.user.id;

    let query = supabase
      .from('tasks')
      .select('*, task_assignees!left(*)')
      .leftJoin('task_assignees', 'tasks.task_id', 'task_assignees.task_id')
      .or(`created_by.eq.${userId},task_assignees.user_id.eq.${userId}`);

    // Optional filter: filter by completion status
    if (status === 'completed') {
      query = query.eq('is_completed', true);
    } else if (status === 'in-progress') {
      query = query.eq('is_completed', false);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching tasks:', error.message);
      return res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }

    // Remove duplicate tasks
    const uniqueTasks = Array.from(new Map(data.map(task => [task.task_id, task])).values());

    return res.status(200).json({ tasks: uniqueTasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTaskById = async (req, res) => {
    try{
        const task = await task.findbyId(req.params.id).populate(
            "assignedTo",
            "name email",
        );

        if(!task) return res.status(404).json({message: "Task not found"});
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      due_Date,
      assignedTo,   // Array of user IDs
      subtasks,
    } = req.body;

    const created_by = req.user.id;

    // 1. Create main task
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .insert([{
        title,
        description,
        priority,
        due_date: due_Date,
        created_by,
      }])
      .select()
      .single(); // Get task_id

    if (taskError) {
      return res.status(400).json({ message: "Task creation failed", error: taskError.message });
    }

    const task_id = task.task_id;

    // 2. Insert assignees if any
    if (Array.isArray(assignedTo) && assignedTo.length > 0) {
      const assigneesData = assignedTo.map(user_id => ({
        task_id,
        user_id,
      }));

      const { error: assigneeError } = await supabase
        .from('task_assignees')
        .insert(assigneesData);

      if (assigneeError) {
        return res.status(500).json({ message: "Assigning users failed", error: assigneeError.message });
      }
    }

    // 3. Insert subtasks if any
    if (Array.isArray(subtasks) && subtasks.length > 0) {
      const formattedSubtasks = subtasks.map(sub => ({
        task_id,
        title: sub.title,
        is_completed: sub.is_completed || false
      }));

      const { error: subtaskError } = await supabase
        .from('subtasks')
        .insert(formattedSubtasks);

      if (subtaskError) {
        return res.status(500).json({ message: "Subtask creation failed", error: subtaskError.message });
      }
    }

    res.status(201).json({ message: "Task created successfully", task });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateTask = async (req, res) => {
    try{

        const task = await task.findbyId(req.params.id);

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.due_Date = req.body.due_Date || task.due_Date;
        task.subtasks = req.body.subtasks || task.subtasks;


        const updatedTask = await task.save();
        res.json({message: "Task successfully updated"});
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const deleteTask = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const updateTaskStatus = async (req, res) => {
    try{

    
    //put 404 error message here
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
};


const updateTaskChecklist = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
};


module.exports={
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskChecklist,
    updateTaskStatus,
}