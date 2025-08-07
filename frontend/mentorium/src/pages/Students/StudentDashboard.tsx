import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext, useEffect, useState } from 'react';
import {type Announcement, type Task} from "../../utils/types"
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import AnnouncementCard from '../components/AnnouncementCard';


const StudentDashboard :React.FC= () => {
  useUserAuth();
  const{user} = useContext(UserContext);
  const [tasks, setTasks] = useState<Task[]>([]);
const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [ loading,setLoading] = useState(false);
  useEffect(()=>{
    const fetchData = async ()=>{
    try {
      setLoading(true);
      const TasksRes = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS);
      const announcementRes = await axiosInstance.get(API_PATHS.ANNOUNCEMENT.GET_ANNOUNCEMENTS);
      const firstAnnouncement = announcementRes.data.announcements[0];
      
      setTasks(TasksRes.data.tasks); // Adjust based on actual structure

      if (firstAnnouncement) {
        setAnnouncement(firstAnnouncement); // store it as an array with one item
      }
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
          {announcement ? (
            <Link to="/announcements">
              <div className="cursor-pointer hover:opacity-90 transition duration-200 hover:border-l-3">
                <AnnouncementCard
                  key={announcement.announcement_id}
                  announcement={announcement}
                />
              </div>
            </Link>
          ) : null}
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