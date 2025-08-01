// components/panels/PanelCard.tsx
import React from "react"
import type { Panel, Lecturer } from "../../utils/types"
import { MoreVertical, Pencil } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type PanelCardProps = {
  panel: Panel;
  previewMode?: boolean;
  onEdit?: (panelId: string) => void;
  onDelete?: (panelId: string) => void;
};

const PanelCard: React.FC<PanelCardProps> = ({ panel, onEdit, onDelete, previewMode = false }) => {
  return (
    <div className="rounded-xl border p-4 bg-white flex flex-col gap-3 min-h-[150px]">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          {panel.name}
        </div>
        {!previewMode && (
          <div className="flex justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger><Pencil className="size-4 text-grey/30 hover:text-grey hover:cursor-pointer"/></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={()=> onEdit?.(panel.id)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> onDelete?.(panel.id)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div className="mt-2 text-sm space-y-2">
        {panel.lecturers.length > 0 ? (
          panel.lecturers.map((lecturer: Lecturer, idx: number) => (
            <div key={lecturer.id} className="p-2 rounded bg-muted text-muted-foreground">
              {lecturer.title} {lecturer.firstname} {lecturer.lastname} - {lecturer.department}
            </div>
          ))
        ) : (
          <p className="italic text-muted-foreground">No lecturers assigned</p>
        )}
      </div>
    </div>
  )
}

export default PanelCard
