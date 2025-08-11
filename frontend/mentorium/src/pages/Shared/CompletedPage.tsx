import { useUserAuth } from '@/hooks/useUserAuth';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import type { Task } from '@/utils/types';
import { TicketCheck} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard';
import PageHeader from '../components/PageHeader';

const CompletedPage :React.FC= () => {
  useUserAuth();
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
      <PageHeader title="Completed" icon={TicketCheck} />
          
     {/* Main Content */}
     <div className='pt-2'>
          <div className='flex grid gap-2'>
            {tasks.map((task) => (
          <TaskCard key={task.task_id} task={task}/>
          ))}
          </div>
        </div>
    </div>
  )
}

export default CompletedPage