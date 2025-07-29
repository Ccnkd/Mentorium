import  ProjectLayout  from '@/components/layouts/ProjectLayout';
//import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext } from 'react';
import { BudgetCard } from '@/pages/components/BudgetCard';
import { Badge } from '@/components/ui/badge';


const BudgetPage :React.FC= () => {
  useUserAuth();

  return (
    <>
      <div>
        <div className='flex justify-between items-start gap-4' >
          <div>
            <p className='text-sm text-grey font-secondary'>Amount</p>
            <h1 className='text-4xl'>GHC 12,500</h1>
          </div>
          <div className='medium text-end'>
            <p className='text-sm text-grey font-secondary'>Status</p>
            <Badge className='bg-yellow-500 text-sm rounded-lg' variant="default">Pending</Badge>
          </div>          
        </div>
      </div>
      <br/>
      <div>
        <BudgetCard/>
      </div>
      </>
  )
}

export default BudgetPage