import { DefenseContext } from '@/contexts/DefenseContext';
import ProjectCard from '@/pages/components/ProjectCard';
import React, { useContext } from 'react'

const ProjectGroups: React.FC = () => {
    const {defense, formattedStartDate,formattedEndDate} = useContext(DefenseContext);
  return (
<div>
    {defense.projectGroups.map((projectGroup) => (
        <div className='border-1 rounded-lg p-4'>
            <div className='flex justify-between items-center'>
            <div className='text-lg font-semibold'>
            {projectGroup.project_title}
            </div>
            <div className='text-md font-secondary '>
            {projectGroup.mentor.full_name}
            </div>
            <div className='text-md font-secondary'>
                <div className='border-l-1 p-4'>
                {projectGroup.members.map((members)=>(
                    <div>
                    {members.full_name}
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
    ))}
    </div>
  )
}

export default ProjectGroups