// components/panels/PanelCard.tsx
import React from "react"
import type { Panel, Lecturer, ProjectGroup, Member } from "../../utils/types"
import {Pencil } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type PanelCardProps = {
  group: ProjectGroup;
  previewMode?: boolean;
  onEdit?: (panelId: string) => void;
  onDelete?: (panelId: string) => void;
};

const ProjectGroupCard: React.FC<PanelCardProps> = ({ group, onEdit, onDelete, previewMode = false }) => {
  return (
    <div className="rounded-xl border p-4 bg-white flex flex-col gap-3 min-h-[150px]">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          {group.project_group_name}
        </div>
        {!previewMode && (
          <div className="flex justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger><Pencil className="size-4 text-grey/30 hover:text-grey hover:cursor-pointer"/></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={()=> onEdit?.(group.project_group_id)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> onDelete?.(group.project_group_id)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div className="mt-2 text-sm space-y-2">
        {group.members.length > 0 ? (
          group.members.map((member: Member) => (
            <div key={member.user_id} className="font-secondary border-l-3 border-primary/50 p-2 rounded-lg">
              <div className="font-medium text-grey text-xl">
              {member.firstname} {member.lastname}
              </div>
            </div>
          ))
        ) : (
          <p className="italic text-muted-foreground">No students assigned</p>
        )}
      </div>
    </div>
  )
}

export default ProjectGroupCard
