//import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext } from 'react';
import SectionCards from '../../components/SectionCards';


const DefenseOverview :React.FC= () => {
  useUserAuth();

  return (
    <div>
      <SectionCards/>
    </div>
  )
}

export default DefenseOverview