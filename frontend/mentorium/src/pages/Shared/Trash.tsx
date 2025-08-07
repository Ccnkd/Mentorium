import { Trash2 } from 'lucide-react'
import React from 'react'
import PageHeader from '../components/PageHeader'

const Trash :React.FC= () => {
  return (
    <div className="px-6 py-8 w-full">
      <PageHeader title="Trash" icon={Trash2} />
      <p className='text-sm text-grey font-secondary'>Items here will be deleted after 30 days</p>
    
     {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-medium text-muted-foreground/30">
            Trash Is Empty
          </p>
        </div>
      </div>
    </div>
    
  )
}

export default Trash