import React, { useState } from 'react';
import type { Task } from "../../utils/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Calendar, Pencil, Star, Trash2 } from 'lucide-react';
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
  const [progress, setProgress] = useState(task.progress || 0);
  
  
  const date = new Date(task.due_date);
  const formatted = date.toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

  const handleCheckboxChange = (checked: boolean) => {
    setIsComplete(checked);
    setProgress(checked ? 100 : 0);
  };

  const handleFavoriteToggle = () => {
  setIsFavorite((prev) => !prev);
  };

const saveTask = async () => {
  // Compare current local state with original task prop
  if (
    task.is_favorite === isFavorite &&
    task.is_completed === isComplete &&
    task.progress === progress
  ) {
    // No changes, skip save
    console.log("No changes detected, skipping update");
    return;
  }

  // Prepare updated fields based on current state
  const updatedFields: Partial<Task> = {
    is_favorite: isFavorite,
    is_completed: isComplete,
    progress: progress,
  };

  try {
    console.log("Updating task with ID:", task.task_id);
    const response = await axiosInstance.put(
      API_PATHS.TASKS.UPDATE_TASK(task.task_id),
      updatedFields
    );
    console.log("Task updated:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Update failed:", error.response.data);
    } else {
      console.error("Error", error.message);
    }
    throw error;
  }
};

  const handleMouseLeave = async () => {
  setIsActionActive(false);
  await saveTask();
  };


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
      onMouseLeave={handleMouseLeave}
      className="w-full px-4 py-3 hover:cursor-pointer">
      <CardContent className="flex items-center justify-between gap-3 p-0">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Checkbox */}
          <Checkbox
            className="rounded-full border-gray-300"
            checked={isComplete}
            onCheckedChange={handleCheckboxChange}
            onClick={(e) => {e.stopPropagation()}}
          />

          {/* Info */}
          <div className="flex flex-col gap-1">
            {/* Top Row: Badge + Date */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <PriorityBadge priority={task.priority} />
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatted}</span>
              </div>
            </div>

            {/* Task Title */}
            <div className="text-lg font-medium text-grey">{task.title}</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Favorite Toggle */}
            <button
          onClick={(e) => {e.stopPropagation();
            handleFavoriteToggle();
          }}
          className="text-muted-foreground"
        >
          {isFavorite ? (<Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
          ) : (
            <Star className="w-4 h-4" />
          )}
        </button>

          {/* Progress Ring */}
          <ProgressRing progress={progress} size={70} />

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
