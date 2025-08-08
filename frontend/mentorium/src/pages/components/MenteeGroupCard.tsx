// components/panels/PanelCard.tsx
import React from "react"
import type { MenteeGroup } from "../../utils/types"
import {Pencil } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type MenteeGroupProps = {
  menteegroup: MenteeGroup;
  previewMode?: boolean;
  onEdit?: (panelId: string) => void;
  onDelete?: (panelId: string) => void;
};

const MenteeGroupCard: React.FC<MenteeGroupProps> = ({ menteegroup, onEdit, onDelete, previewMode = false }) => {
  return (
    <div className="rounded-xl border p-4 bg-white flex flex-col gap-3 min-h-[150px]">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          {menteegroup.name ?? "Untitled"}
        </div>
        {!previewMode && (
          <div className="flex justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger><Pencil className="size-4 text-grey/30 hover:text-grey hover:cursor-pointer"/></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={()=> onEdit?.(menteegroup.id)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> onDelete?.(menteegroup.id)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div className="mt-2 text-sm space-y-2">
        {menteegroup.students.length > 0 ? (
          menteegroup.students.map((student) => (
            <div key={student.user_id} className="font-secondary border-l-3 border-primary/50 pl-2 rounded-lg">
              <div className="font-secondary text-grey text-md">
                {student.firstname} {student.lastname}
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

export default MenteeGroupCard
