const supabase = require('../config/db');

const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const userId = req.user.id;

    // 1. Query all tasks where user is creator or assignee
const { data, error } = await supabase
  .from('tasks')
  .select(`
    task_id,
    project_id,
    title,
    description,
    due_date,
    is_completed,
    is_favorite,
    progress,
    priority,
    created_by (
      user_id,
      firstname,
      lastname
    ),
    assignees:task_assignees (
      user_id,
      users (
        firstname,
        lastname
      )
    )
  `);
      
    if (error) {
      console.error('Error fetching tasks:', error.message);
      return res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }

    // 2. Filter by completion status if specified
    let filteredTasks = data;
    if (status === 'completed') {
      filteredTasks = data.filter(task => task.is_completed === true);
    } else if (status === 'in-progress') {
      filteredTasks = data.filter(task => task.is_completed === false);
    }

    // 3. Remove duplicates (caused by join-like behavior)
    const uniqueTasks = Array.from(
      new Map(filteredTasks.map(task => [task.task_id, task])).values()
    );

    return res.status(200).json({ tasks: uniqueTasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const getTaskById = async (req, res) => {
    try{
        const task = await task.findbyId(req.params.id).populate(

        );

        if(!task) return res.status(404).json({message: "Task not found"});
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const createTask = async (req, res) => {
  const created_by = req.user.id;
  try {
    const {
      title,
      description,
      priority,
      due_date,
      assignees,   // Array of user IDs
      subtasks,
    } = req.body;

    const created_by = req.user.id;
    const formattedDueDate = due_date?.split("T")[0] ?? null;

    // 1. Create main task
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .insert([{
        created_by,
        title,
        description,
        priority,
        due_date: formattedDueDate,        
      }])
      .select()
      .single(); // Get task_id

    if (taskError) {
      console.error("Supabase insert error:", taskError);
      return res.status(400).json({ message: "Task insert failed", error: taskError.message });
    }

    const task_id = task.task_id;
    

    // 2. Insert assignees if any
    if (Array.isArray(assignees) && assignees.length > 0) {
      const assigneesData = assignees.map(a => ({
        task_id,
        user_id: a.user_id,
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
    try {
      const task_id = req.params.task_id;
      const updateData = {
        title: req.body.title,
        is_completed: req.body.is_completed,
        is_favorite: req.body.is_favorite,
        progress: req.body.progress,
        description: req.body.description,
        priority: req.body.priority,
        due_date: req.body.due_date,
        subtasks: req.body.subtasks,
      };

      // Remove undefined fields to avoid overwriting with null
      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key]
      );

      const { data, error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('task_id', task_id)
        .select()
        .single();

      if (error) {
        return res.status(400).json({ message: "Failed to update task", error });
      }

      if (!data) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.json({ message: "Task successfully updated", task: data });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};


const deleteTask = async (req, res) => {
  const { task_id } = req.params

  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('task_id', task_id)

    if (error) {
      throw error
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
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