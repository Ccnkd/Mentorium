import  DefenseLayout  from '@/components/layouts/ProjectLayout';
//import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext } from 'react';
import SectionCards from '../../components/SectionCards';


const DefenseOverview :React.FC= () => {
  useUserAuth();

  return (
    <div>
      This is the Defense Overview
    </div>
  )
}

export default DefenseOverview