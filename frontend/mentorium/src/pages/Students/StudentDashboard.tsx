import  DashboardLayout  from '@/components/layouts/DashboardLayout';
import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext } from 'react';
import AnnouncementView from '../components/AnnouncementView';
import TaskList from '../components/TaskList';


const StudentDashboard :React.FC= () => {
  useUserAuth();
  const{user} = useContext(UserContext);
  return (
    <>
        <div className="px-6 py-8 w-full">
          <div className="w-full flex items-start justify-start">
            <h1 className="text-4xl text-left">Hello, {user?.firstname|| ""}</h1>
          </div>
          <br></br>
          <div>
            <AnnouncementView />
          </div>
          <br></br>
          <div className='text-grey font-alternate font-semibold tracking-widest'>
            TASKS
          </div>
            <TaskList/>
          </div>
    </>
  )
}

export default StudentDashboard