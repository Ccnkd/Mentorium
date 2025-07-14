const supabase = require('../config/db');

const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const userId = req.user.id;

    let query = supabase
      .from('tasks')
      .select('*')
      .or(`created_by.eq.${userId},assignee_user_id.eq.${userId}`);

    if (status === 'pending') {
      query = query.lt('progress', 100);
    } else if (status === 'completed') {
      query = query.eq('progress', 100);
    }
    // else: all tasks (no extra filter)

    const { data: tasks, error } = await query;

    if (error) {
      return res.status(400).json({ message: 'Error fetching tasks', error: error.message });
    }

    res.status(200).json({ tasks });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



const getTaskById = async (req, res) => {
    try{
        const task = await task.findbyId(req.params.id).populate(
            "assignedTo",
            "name email profileImgUrl"
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
            assignee_user_id,
            assignee_group_id,
            assignee_subgroup_id,
            subtasks = []
        } = req.body;

        const created_By = req.user.id;

        let progress = 0;
        //Create the main task
        const { data: task, error: taskError } = await supabase
            .from('tasks')
            .insert([{
                title,
                description,
                priority,
                created_By,
                due_Date,
                assignee_user_id,
                assignee_group_id,
                assignee_subgroup_id,
                progress
            }])
            .select()
            .single(); // So we can get the generated ID

        if (taskError) {
            return res.status(400).json({ message: "Task creation failed", error: taskError.message });
        }

        const task_id = task.id; // Get the auto-generated UUID from Supabase

        // 2. Insert subtasks if any
        if (Array.isArray(subtasks) && subtasks.length > 0) {
            const formattedSubtasks = subtasks.map(sub => ({
                task_id,
                title: sub.title,
                is_completed: sub.is_completed || false
            }));

            //Initialize progress to 0
            //const completed = subtasks.filter(s => s.is_completed).length;
            //progress = Math.round((completed / subtasks.length) * 100);

            const { error: subtaskError } = await supabase
                .from('subtasks')
                .insert(formattedSubtasks);

            if (subtaskError) {
                return res.status(500).json({ message: "Subtask creation failed", error: subtaskError.message });
            }
        }

        res.status(201).json({ message: "Task and subtasks created successfully", task });

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


const getDashboardData = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const getUserDashboardData = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
};


module.exports={
    getTasks,
    getTaskById,
    getUserDashboardData,
    getDashboardData,
    createTask,
    updateTask,
    deleteTask,
    updateTaskChecklist,
    updateTaskStatus,
}