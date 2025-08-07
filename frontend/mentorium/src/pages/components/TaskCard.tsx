import React, { useState } from 'react';
import type { Task } from "../../utils/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Calendar, MoreVertical, Pencil, Star, Trash2 } from 'lucide-react';
import { PriorityBadge } from './PriorityBadge';
import ProgressRing from './ProgressRing';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import TaskModal from '../Shared/TaskModal';

type TaskCardProps = {
  task: Task;
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isFavorite, setIsFavorite] = useState(task.is_favorite || false);
  const [isComplete, setIsComplete] = useState(task.is_completed || false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActionActive, setIsActionActive] = useState(false);

  const handleDeleteTask = async (task_id: string) => {
    try {
      console.log("Deleting task ID:", task_id);
      const response = await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(task_id));
      console.log("Task deleted successfully", response);
    } catch (error: any) {
      if (error.response) {
        console.error("Delete failed:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request setup error:", error.message);
      }
    }
  };


  return (
    <>
    <Card 
      onClick={()=>setIsModalOpen(true)}
      onMouseEnter={()=>setIsActionActive(true)}
      onMouseLeave={()=>setIsActionActive(false)}
      className="w-full border px-4 py-3 hover:cursor-pointer">
      <CardContent className="flex items-center justify-between gap-3 p-0">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Checkbox */}
          <Checkbox
            className="rounded-full border-gray-300"
            checked={isComplete}
            onCheckedChange={(checked) => setIsComplete(Boolean(checked))}
          />

          {/* Info */}
          <div className="flex flex-col gap-1">
            {/* Top Row: Badge + Date */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <PriorityBadge priority={task.priority} />
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{task.due_date}</span>
              </div>
            </div>

            {/* Task Title */}
            <div className="text-lg font-medium text-grey">{task.title}</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Favorite Toggle */}
          <button onClick={() => setIsFavorite(!isFavorite)} className="text-muted-foreground">
            {isFavorite ? (
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
            ) : (
              <Star className="w-4 h-4" />
            )}
          </button>

          {/* Progress Ring */}
          <ProgressRing progress={task.progress} />

          {/* Action Panel */}
          <div
            className={`flex items-center justify-between text-muted-foreground transition-all duration-300 ease-in-out overflow-hidden ${
              isActionActive ? 'w-[50px] opacity-100' : 'w-0 opacity-0'
            }`}
          >
            <button onClick={() => {}}>
              <Pencil className="size-5 hover:cursor-pointer hover:text-primary" />
            </button>
            <button onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task.task_id);
                  }}
                >
              <Trash2 className="size-5 hover:cursor-pointer hover:text-primary" />
            </button>
          </div>


          {/* Toggle Button */}
        </div>
      </CardContent>
    </Card>
    {isModalOpen && (
      <TaskModal
        task={task}
        onClose={() => setIsModalOpen(false)}
      />
    )}
    </>
  );
};

export default TaskCard;
