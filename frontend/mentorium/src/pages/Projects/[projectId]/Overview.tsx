import  ProjectLayout  from '@/components/layouts/ProjectLayout';
//import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext } from 'react';
import SectionCards from '../../components/SectionCards';
import { Progress } from '@/components/ui/progress';


const Overview :React.FC= () => {
  useUserAuth();

  return (
        <>
            {/* Milestone Progress Bar */}
          <div className='font-secondary text-xl'>
            Milestones
          </div>
          <div className="w-full">
            <Progress value={45} className="h-1 bg-[#CFD8D7]" />
          </div>
          <br/>
      <SectionCards/>
      </>
  )
}

export default Overview