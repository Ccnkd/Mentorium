import { useUserAuth } from '@/hooks/useUserAuth';
import { UserContext } from '@/contexts/UserContext';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import type { Task } from '@/utils/types';
import { TicketCheck} from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard';

const CompletedPage :React.FC= () => {
  useUserAuth();
  const{user} = useContext(UserContext);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(()=>{
    const fetchData = async ()=>{
    try {
      const TasksRes = await axiosInstance.get(API_PATHS.TASKS.GET_COMPLETED_TASKS);
      setTasks(TasksRes.data.tasks); // Adjust based on actual structure
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    }

    fetchData();
  },[]);
  return (
    <div className="px-6 py-8 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
              <TicketCheck className="text-muted-foreground size-5" />
            </div>
            <h1 className="text-4xl text-grey">Completed</h1>
          </div>
          
     {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className='flex grid gap-2'>
            {tasks.length > 0 ? (tasks.map((task) => (
          <TaskCard key={task.task_id} task={task}/>
          ))):(
            <div className="flex-1 flex items-center justify-center text-center text-muted-foreground/30 font-medium py-8 text-4xl">
                No Tasks Completed
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default CompletedPage