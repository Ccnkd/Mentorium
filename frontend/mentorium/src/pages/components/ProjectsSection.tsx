"use client";

import * as React from "react";
import { ChevronDown, Folder, Pin, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  isPinned?: boolean;
  isActive?: boolean;
}

export function ProjectsSection() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingName, setEditingName] = React.useState("");

  const addNewProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "New Project",
      isPinned: false,
      isActive: false,
    };
    setProjects([...projects, newProject]);
    setEditingId(newProject.id);
    setEditingName(newProject.name);
  };

  const startEditing = (project: Project) => {
    setEditingId(project.id);
    setEditingName(project.name);
  };

  const saveEdit = () => {
    if (editingId && editingName.trim()) {
      setProjects(
        projects.map((p) =>
          p.id === editingId ? { ...p, name: editingName.trim() } : p
        )
      );
    }
    setEditingId(null);
    setEditingName("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const deleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  const togglePin = (projectId: string) => {
    setProjects(
      projects.map((p) =>
        p.id === projectId ? { ...p, isPinned: !p.isPinned } : p
      )
    );
  };

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-2">
        <SidebarGroupLabel asChild>
          <span className="text-sm font-semibold tracking-wide">PROJECTS</span>
        </SidebarGroupLabel>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={addNewProject}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen ? "rotate-0" : "-rotate-90"
              )}
            />
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <SidebarGroupContent>
          <SidebarMenu>
            {projects.map((project) => (
              <SidebarMenuItem key={project.id}>
                <div className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-sidebar-accent cursor-pointer group">
                  <Folder className="h-4 w-4 text-sidebar-foreground/70" />
                  {editingId === project.id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onBlur={saveEdit}
                      onKeyDown={handleKeyDown}
                      className="flex-1 text-sm bg-background border border-border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring"
                      autoFocus
                    />
                  ) : (
                    <span
                      className="flex-1 text-sm text-sidebar-foreground font-medium"
                      onDoubleClick={() => startEditing(project)}
                    >
                      {project.name}
                    </span>
                  )}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 text-sidebar-foreground/70 hover:text-sidebar-foreground"
                      onClick={() => startEditing(project)}
                      title="Rename project"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-5 w-5 p-0",
                        project.isPinned
                          ? "text-red-500"
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                      )}
                      onClick={() => togglePin(project.id)}
                      title={project.isPinned ? "Unpin project" : "Pin project"}
                    >
                      <Pin
                        className={cn(
                          "h-3 w-3",
                          project.isPinned && "fill-current"
                        )}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 text-red-500 hover:text-red-600"
                      onClick={() => deleteProject(project.id)}
                      title="Delete project"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </div>
    </SidebarGroup>
  );
}
export default ProjectsSection;
