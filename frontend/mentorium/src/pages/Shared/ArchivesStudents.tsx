import { FolderGit2Icon } from 'lucide-react'
import React from 'react'
import { Input } from "@/components/ui/input"
import SearchInput from '../components/SearchInput'

const Archives :React.FC= () => {
  return (
    <div className="px-6 py-8 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
              <FolderGit2Icon className="text-muted-foreground size-5" />
            </div>
            <h1 className="text-4xl text-grey">Archives</h1>
          </div>
          <br/>
          <SearchInput/>
          
    </div>
  )
}

export default Archives