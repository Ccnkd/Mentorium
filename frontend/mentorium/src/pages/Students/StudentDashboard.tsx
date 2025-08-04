import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext, useEffect, useState } from 'react';
import type {Task} from "../../utils/types"
import AnnouncementView from '../components/AnnouncementView';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';


const StudentDashboard :React.FC= () => {
  useUserAuth();
  const{user} = useContext(UserContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ loading,setLoading] = useState(false);
  useEffect(()=>{
    const fetchData = async ()=>{
    try {
      setLoading(true);
      const TasksRes = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS);
      setTasks(TasksRes.data.tasks); // Adjust based on actual structure
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }finally{
      setLoading(false);
    }
    }

    fetchData();
  },[]);
  return (
    <>
        <div className="px-6 py-8 w-full">
          <div className="w-full flex items-start justify-start">
            <h1 className="text-4xl text-left">Hello, {user?.firstname|| ""}</h1>
          </div>
          <br></br>
          <Link to="/announcements">
            <div className="cursor-pointer hover:opacity-90 transition duration-200">
              <AnnouncementView />
            </div>
          </Link>
          <br></br>
          <div className='text-grey font-alternate font-semibold tracking-widest'>
            TASKS
          </div>
          <div className='flex grid gap-2'>
            {tasks.map((task) => (
          <TaskCard key={task.task_id} task={task}/>
          ))}
          </div>
          </div>
    </>
  )
}

export default StudentDashboard