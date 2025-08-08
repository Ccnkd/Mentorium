//import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext } from 'react';
import SectionCards from '../../components/SectionCards';


const ManagementAnalytics :React.FC= () => {
  useUserAuth();

  return (
    <div>
      <p>Overview Page</p>
    </div>
  )
}

export default ManagementAnalytics