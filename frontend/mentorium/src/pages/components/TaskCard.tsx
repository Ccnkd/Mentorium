import React, { useState} from 'react'
import type { Task } from "../../utils/types"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { Calendar, MoreVertical, Star } from 'lucide-react';
import { PriorityBadge } from './PriorityBadge';
import ProgressRing from './ProgressRing';

type TaskCardProps ={
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({task}) => {
    const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card className="w-full border px-4 py-3">
      <CardContent className="flex items-center justify-between gap-3 p-0">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Checkbox */}
          <Checkbox className="rounded-full border-gray-300" />

          {/* Info */}
          <div className="flex flex-col gap-1">
            {/* Top Row: Badge + Date */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <PriorityBadge priority = {task.priority} />
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{task.due_date}</span>
              </div>
            </div>

            {/* Task Title */}
            <div className="text-lg font-medium text-grey">{task.title}</div>
          </div>
        </div>

        {/* Right Section: Favorite, Progress, Menu */}
        <div className="flex items-center gap-1">
          {/* Favorite Toggle */}
          <button onClick={() => setIsFavorite(!isFavorite)} className="text-muted-foreground">
            {task.is_favorite ? <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" /> : <Star className="w-4 h-4" />}
          </button>
        <div>
          <ProgressRing progress={task.progress}/>
        </div>
          {/* More menu icon */}
          <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskCard