import React, { useState } from 'react'
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge';
import { Calendar, MoreVertical, Star } from 'lucide-react';
import ProgressRing from './ProgressRing';
import type { Project } from '@/utils/types';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import { PriorityBadge } from './PriorityBadge';

type ProjectCardProps={
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project}) => {
    const [isFavorite, setIsFavorite] = useState(project.is_favorite||false);
      const [isActionActive, setIsActionActive] = useState(false);
    
    const handleDeleteProject = async (project_id: string) => {
    try {
      console.log("Deleting project ID:", project_id);
      const response = await axiosInstance.delete(API_PATHS.PROJECTS.DELETE_PROJECTS(project_id));
      console.log("Project deleted successfully", response);
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
    <Card className="w-full border px-4 py-3">
      <CardContent className="flex items-center justify-between gap-3 p-0">
        {/* Left Section */}
        <div className="flex items-center gap-3 pl-1">

          {/* Info */}
          <div className="flex flex-col gap-3">
            {/* Task Title */}
            <div className="text-3xl font-semibold text-grey">{project.title}</div>
            {/* Top Row: Badge + Date */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <PriorityBadge priority={project.priority}/>
              {project.is_final_year_project?(
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                Final Year Project
              </Badge>
              ):(
              <></>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{project.due_date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Favorite, Progress, Menu */}
        <div className="flex items-center gap-3 pr-5">
          {/* Favorite Toggle */}
          <button onClick={() => setIsFavorite(!isFavorite)} className="text-muted-foreground">
            {isFavorite ? <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" /> : <Star className="w-4 h-4" />}
          </button>

          {/* Progress Ring */}
          <div>
          <ProgressRing progress={project.progress} size={95}/>
          </div>
          
         </div>
      </CardContent>
    </Card>
  )
}

export default ProjectCard