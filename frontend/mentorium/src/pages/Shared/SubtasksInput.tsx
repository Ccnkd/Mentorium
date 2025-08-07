import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import type { Subtask } from '@/utils/types';
import { v4 as uuidv4 } from 'uuid';

type SubtasksInputProps ={
    subtask: Subtask[]
    setSubtasks: (value: Subtask[]) => void;
}

const SubtasksInput :React.FC<SubtasksInputProps> = ({subtask, setSubtasks}) => {
    const [option, setOption]= useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleAddOption = () => {
        if (option.trim()) {
        const newSubtask: Subtask = {
            id: uuidv4(),
            title: option.trim(),
            is_completed: false,
        };
        setSubtasks([...subtask, newSubtask]);
        setOption('');
        }
    };

    const handleDeleteOption = (index)=>{
        const updateArr = subtask.filter((_,idx)=> idx !== index);
        setSubtasks (updateArr)
    }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className='shadow-none text-primary'>
          <PlusCircleIcon/>Add Subtasks</Button>
      </DialogTrigger>
      <DialogContent className="w-4xl">
        <DialogHeader>
          <DialogTitle>Subtasks</DialogTitle>
        </DialogHeader>
            {subtask.map((item, index) => (
            <div
                key={item.id}
                className="border p-3 rounded-lg flex justify-between items-center text-gray-700"
            >
                <p>
                <span className="mr-2 text-muted">
                    {index < 9 ? `0${index + 1}` : index + 1}.
                </span>
                {item.title}
                </p>
                <button
                className="cursor-pointer text-red-500"
                onClick={() => handleDeleteOption(index)}
                >
                <Trash2 />
                </button>
            </div>
            ))}
        <div className=''>
        <input type='text'
            placeholder='Enter Subtask'
            value={option}
            onChange={({target})=> setOption(target.value)}
            className=''
        />
        <button className='' onClick={handleAddOption}>Add</button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SubtasksInput