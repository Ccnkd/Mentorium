import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Edit, PlusCircle } from "lucide-react"
import { useLocation } from 'react-router-dom'
import { Textarea } from "@/components/ui/textarea"
import {NLDatePicker} from "../components/NLDatePicker"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const CreateModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const [activeTab, setActiveTab] = React.useState("Task");
  const [loading, setLoading] = React.useState(false)

  const [taskData, setTaskData] = React.useState({
    title: "",
    description: "",
    priority: "Low",
    due_Date: null as Date| null,
    subtasks: [],
    assigned_to:[],
  })

  const [projectData, setProjectData] = React.useState({
    title: "",
    description: "",
    priority: "Low",
    due_Date: null as Date|null,
    subtasks: [],
    assigned_to:[],
  })

  const handleValueChange = (key: string, value: string) => {
    setTaskData((prev) => ({ ...prev, [key]: value }))
    setProjectData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => {
    if (activeTab === "Task") {
      // Handle task creation
      console.log("Creating task:", taskData);
      await createTask(taskData)
    } else if (activeTab === "Project") {
      // Handle project creation
      console.log("Creating project:", projectData);
      // e.g. await createProject(projectData)
    }
    onClose(); // close modal after creation
  };

  const clearData = ()=>{
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      due_Date: null as Date|null,
      subtasks: [],
      assigned_to:[],
    });
  }

  const createTask = async()=>{

  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="p-4 pb-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center">
              <Edit className="size-5 text-muted-foreground" />
            </div>
            <DialogTitle className="text-3xl">Create</DialogTitle>
          </div>
          <DialogDescription className="font-secondary text-sm text-muted-foreground">
            Add a task or project by switching the tab below
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="Task"
          value={activeTab}
          onValueChange={(val) => setActiveTab(val)}>
          <TabsList className="flex justify-between border-b bg-background w-full">
            <TabsTrigger value="Task" className="font-secondary text-grey border-0 data-[state=active]:border-b-3 border-primary data-[state=active]:shadow-none">Task</TabsTrigger>
            <TabsTrigger value="Project" className="font-secondary text-grey border-0 data-[state=active]:border-b-3 border-primary data-[state=active]:shadow-none">Project</TabsTrigger>
          </TabsList>

          <TabsContent value="Task" className="pt-4 px-4">
            <div className="grid gap-3">
              <input
                id="task-title"
                placeholder="Task Title"
                value={taskData.title}
                onChange={(e) => handleValueChange("title", e.target.value)}
                className="font-semibold text-2xl border-0 p-0 focus:outline-none"
              />
              <Textarea
                id="task-desc"
                placeholder="Enter the Task Description"
                value={taskData.description}
                onChange={(e) => handleValueChange("description", e.target.value)}
                className="shadow-none rounded-lg border-0 p-0 min-h-7"
              />
            <div className="flex items-center gap-4 p-0 ">
              {/*Priority Dropdown*/}
              <div>
                <Label className="pb-2">Priority</Label>
              <Select
                value={taskData.priority}
                onValueChange={(val) => handleValueChange("priority", val)}
                  >
              <SelectTrigger className="w-[180px] shadow-none">
                <SelectValue placeholder="Low Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
            </div>
            <div className="pt-6">
              <NLDatePicker
                selectedDate={taskData.due_Date}
                onDateChange ={(date) =>
                  setTaskData((prev) => ({ ...prev, due_Date: date }))
                }
              />
            </div>
            </div>
            {/*Assigned To*/}
            <div className="flex items-center gap-4 p-0">
            <div>
              <Label className="pb-2">Assigned To</Label>
              <Button variant="secondary" className="bg-background border-1 rounded-lg shadow-none text-grey font-secondary"><PlusCircle/>Add Assignees</Button>
            </div>
            <div className="flex items-center pt-5">
             <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              
              <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            
            </div>
            </div>
          </TabsContent>


          <TabsContent value="Project" className="pt-4 px-4">
            <div className="grid gap-3">
              <input
                id="project-title"
                placeholder="Project Title"
                value={projectData.title}
                onChange={(e) => handleValueChange("title", e.target.value)}
                className="font-semibold text-2xl border-0 p-0 focus:outline-none"
              />
              <Textarea
                id="project-desc"
                placeholder="Enter the Project Description"
                value={projectData.description}
                onChange={(e) => handleValueChange("description", e.target.value)}
                className="shadow-none rounded-lg border-0 p-0 min-h-7"
              />
              
              {/*Priority Dropdown*/}             
              <div className="flex items-center gap-4 p-0 ">

              <div>
                <Label className="pb-2">Priority</Label>
              <Select
                value={projectData.priority}
                onValueChange={(val) => handleValueChange("priority", val)}
                  >
              <SelectTrigger className="w-[180px] shadow-none">
                <SelectValue placeholder="Low Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
            </div>
            <div className="pt-6">
              <NLDatePicker
                selectedDate={projectData.due_Date}
                onDateChange ={(date) =>
                  setProjectData((prev) => ({ ...prev, due_Date: date }))
                }
              />
            </div>
            </div>

            {/*Assigned To*/}
            <div className="flex items-center gap-4 p-0">
            <div>
              <Label className="pb-2">Assigned To</Label>
              <Select>
              <SelectTrigger className="w-[180px] shadow-none">
                <SelectValue placeholder="Low Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
            </div>
            <div className="flex items-center pt-5">
             <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              
              <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            
            </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="p-4 pt-2 flex gap-2">
          <Button onClick={handleSubmit} className="rounded-lg">Create</Button>
          <DialogClose asChild>
            <Button variant="secondary" onClick={onClose} className="rounded-lg">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
