import  ProjectLayout  from '@/components/layouts/ProjectLayout';
//import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext } from 'react';
import SectionCards from '../../components/SectionCards';


const Overview :React.FC= () => {
  useUserAuth();

  return (
      <SectionCards/>
  )
}

export default Overview