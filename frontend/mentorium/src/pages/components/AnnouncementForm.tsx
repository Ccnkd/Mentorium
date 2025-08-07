import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import type { Announcement } from "@/utils/types";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { SelectUsers } from "../Shared/SelectUsers";
import { fetchStudents } from "@/utils/userService";


interface Props {
  open: boolean;
  onCancel: () => void;
}

export default function AnnouncementForm({ open, onCancel}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [announcementData, setAnnouncement] = useState<Partial<Announcement>>({
    title:'',
    description:'',
    assignees: []
  })

  const clearData = ()=>{
    setAnnouncement({
      title:'',
      description:'',
      assignees: []
    })
  }

  const createAnnouncement= async ( announcement: Partial<Announcement>)=>{
    try{
      console.log("Submitting announcement:", JSON.stringify(announcementData, null, 2));
      const res = await axiosInstance.post(API_PATHS.ANNOUNCEMENT.CREATE, announcement)
      console.log("Announcement Created:", res.data)
    }catch(error:any){
      console.error("Failed to create announcement"!)
    }
  }

  useEffect(() => {
    if (open && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open]);

  const handleValueChange = (key: string, value: string) => {
    setAnnouncement((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async ()=>{
    try{
      await createAnnouncement(announcementData);
      clearData;
    }catch(error){

    }
  }
  return (
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        open ? "max-h-[500px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-10"
      }`}
      ref={ref}
    >
      <Card className="mt-4 w-full shadow-md border-2 border-gray-200 p-0">
        <CardContent className="p-3">
            <input
              id="task-title"
              placeholder="Announcement Title"
              value={announcementData.title}
              onChange={(e) => handleValueChange("title", e.target.value)}
              className="font-semibold text-2xl border-0 p-0 focus:outline-none"
            />
            <br/>
            <Textarea
                id="task-desc"
                placeholder="What would you like to announce?"
                value={announcementData.description}
                onChange={(e) => handleValueChange("description", e.target.value)}
                className="shadow-none rounded-lg border-0 p-0 min-h-7"
              />
          <div className="flex justify-end gap-2 mt-4">
            <SelectUsers              
              selectedIds={announcementData.assignees?.map(a => a.assignee_id) || []}
              setSelectedIds={(ids: string[]) =>
                setAnnouncement(prev => ({
                  ...prev,
                  assignees: ids.map(id => ({ assignee_id: id })),
                }))
              }
              fetchData={fetchStudents}
              renderLabel={(user) => `${user.firstname} ${user.lastname}`}
              title="Assign Users"
            />
            
            <Button variant="outline" onClick={onCancel} className="rounded-lg shadow-none">
              Cancel
            </Button>
            <Button className="rounded-lg" onClick={handleSubmit}>Create</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
