import { Button } from '@/components/ui/button';
import { ProjectContext } from '@/contexts/ProjectContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import TaskCard from '@/pages/components/TaskCard';
import React, { useContext } from 'react';


const TasksPage :React.FC= () => {
  useUserAuth();
  const{project} = useContext(ProjectContext);
  return (
    <>
    <div >
    <Button className='rounded-lg'>
    Create
    </Button>
    </div>
    <div className='flex grid gap-2 pt-2'>
        {project.tasks.map((task) => (
          <TaskCard key={task.task_id} task={task}/>
          ))}
    </div>
    </>
  )
}

export default TasksPage