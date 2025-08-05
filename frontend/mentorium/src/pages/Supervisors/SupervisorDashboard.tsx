import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import type {Announcement, Task} from "../../utils/types"
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import ProjectCard from '../components/ProjectCard';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths'
import AnnouncementCard from '../components/AnnouncementCard';


const SupervisorDashboard :React.FC= () => {
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
            <div className="cursor-pointer hover:opacity-90 transition duration-200 hover:border-l-3">
              {announcement && (
                <Link to="/announcements">
                  <div className="cursor-pointer hover:opacity-90 transition duration-200">
                    <AnnouncementCard
                      key={announcement.announcement_id}
                      announcement={announcement}
                    />
                  </div>
                </Link>
              )}
            </div>
          </Link>
          <br></br>
          <div className='text-grey text-xs font-alternate font-semibold tracking-widest'>
            TASKS
          </div>
          <div className='flex grid gap-2'>
            {tasks.map((task) => (
          <TaskCard key={task.task_id} task={task}/>
          ))}
          </div>
          <br/>
          <div className='text-grey text-xs font-alternate font-semibold tracking-widest'>
            PROJECTS
          </div>
          <div className='flex px-2 py-2'>
            <ProjectCard/>
          </div>
          </div>
    </>
  )
}

export default SupervisorDashboard