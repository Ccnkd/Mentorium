import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import type { Subtask } from '@/utils/types';
import { v4 as uuidv4 } from 'uuid';
import { ScrollArea } from '@/components/ui/scroll-area';

type SubtasksInputProps = {
  subtask: Subtask[];
  setSubtasks: (value: Subtask[]) => void;
};

const SubtasksInput: React.FC<SubtasksInputProps> = ({ subtask, setSubtasks }) => {
  const [option, setOption] = useState('');

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

  const handleDeleteOption = (index: number) => {
    const updated = subtask.filter((_, idx) => idx !== index);
    setSubtasks(updated);
  };

  return (
    <Card className="w-full max-w-xl rounded-lg gap-3">
      <CardHeader>
        <CardTitle className="flex items-center text-grey">
          Subtasks
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className='h-[100px] border-1 rounded-lg'>
        {subtask.length === 0 ? (
          <p className="text-muted-foreground text-sm">No subtasks added yet.</p>
        ) : (
          subtask.map((item, index) => (
            <div
              key={item.id}
              className="border-1 p-2 text-grey font-secondary text-sm rounded-lg flex justify-between items-center"
            >
              <p>
                {item.title}
              </p>
              <button
                className="cursor-pointer text-red-500 hover:text-red-600"
                onClick={() => handleDeleteOption(index)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
        </ScrollArea>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter subtask"
          value={option}
          onChange={({ target }) => setOption(target.value)}
        />
        <Button onClick={handleAddOption} variant="outline">
          <PlusCircleIcon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubtasksInput;
