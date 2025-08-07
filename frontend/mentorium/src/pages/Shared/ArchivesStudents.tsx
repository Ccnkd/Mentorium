import { FolderGit2Icon } from 'lucide-react'
import React from 'react'
import SearchInput from '../components/SearchInput'
import PageHeader from '../components/PageHeader'

const Archives :React.FC= () => {
  return (
    <div className="px-6 py-8 w-full">
          <PageHeader title="Archives" icon={FolderGit2Icon} />
          <br/>
          <SearchInput/>
          
    </div>
  )
}

export default Archives