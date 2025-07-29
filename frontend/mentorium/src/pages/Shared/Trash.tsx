import { Trash2 } from 'lucide-react'
import React from 'react'

const Trash :React.FC= () => {
  return (
    <div className="px-6 py-8 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
              <Trash2 className="text-muted-foreground size-5" />
            </div>
            <h1 className="text-4xl text-grey">Trash</h1>
          </div>
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