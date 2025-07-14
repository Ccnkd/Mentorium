import  ProjectLayout  from '@/components/layouts/ProjectLayout';
//import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext } from 'react';
import { BudgetCard } from '@/pages/components/BudgetCard';


const BudgetPage :React.FC= () => {
  useUserAuth();

  return (
        <BudgetCard/>
  )
}

export default BudgetPage