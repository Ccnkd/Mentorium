import  ProjectLayout  from '@/components/layouts/ProjectLayout';
//import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext } from 'react';


const TasksPage :React.FC= () => {
  useUserAuth();
  //const{user} = useContext(UserContext);
  return (
    <ProjectLayout>
        Budget
    </ProjectLayout>
  )
}

export default TasksPage