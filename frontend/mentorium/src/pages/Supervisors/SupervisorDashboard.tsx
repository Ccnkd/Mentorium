import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext } from 'react'
import AnnouncementView from '../components/AnnouncementView';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import ProjectCard from '../components/ProjectCard';


const SupervisorDashboard :React.FC= () => {
  useUserAuth();
  const{user} = useContext(UserContext);
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
          <div className='text-grey text-xs font-alternate font-semibold tracking-widest'>
            TASKS
          </div>
          <div className='flex px-2 py-2'>
            <TaskCard/>
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