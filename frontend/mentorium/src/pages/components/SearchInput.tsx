import { Input } from '@/components/ui/input'
import React, { type PropsWithChildren } from 'react'

const SearchInput: React.FC<PropsWithChildren>= () => {
  return (
    <div><Input placeholder="Search" className='rounded- lg'/></div>
  )
}

export default SearchInput