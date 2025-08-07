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
import type { Project, Subtask, Task } from "../../utils/types"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Edit, PlusCircle } from "lucide-react"
import { useLocation } from 'react-router-dom'
import { Textarea } from "@/components/ui/textarea"
import {NLDatePicker} from "../components/NLDatePicker"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {SelectUsers } from "./SelectUsers"
import axiosInstance from "@/utils/axiosInstance"
import { API_PATHS } from "@/utils/apiPaths"
import { PRIORITY_OPTIONS } from "@/utils/data"
import { fetchStudents } from "@/utils/userService"
import { UserContext } from "@/contexts/UserContext"
import SubtasksInput from "./SubtasksInput"

export const CreateModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const location = useLocation();
  const { user } = React.useContext(UserContext);
  const { taskId } = location.state || {};
  const [activeTab, setActiveTab] = React.useState("Task");
  const [loading, setLoading] = React.useState(false)
  const [subtasks, setSubtasks] = React.useState<Subtask[]>([]);

  const [taskData, setTaskData] = React.useState<Partial<Task>>({
    title: '',
    description: '',
    due_date: new Date().toISOString(), // initialize with current date
    priority: 1,
    assignees: [],
    subtasks: [],
  });

  const [projectData, setProjectData] = React.useState<Partial<Project>>({
      id: '',
      title: '',
      description: '',
      due_date: new Date().toISOString(),
      assignees: []
  })

  const handleTaskChange = <K extends keyof Task>(key: K, value: Task[K]) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  const handleProjectChange = <K extends keyof Project>(key: K, value: Project[K]) => {
    setProjectData((prev) => ({ ...prev, [key]: value }));
  };



  const handleSubmit = async () => {
    if (activeTab === "Task") {
      // Handle task creation
      const fullTaskData = { ...taskData, subtasks };
      console.log("Creating task:", fullTaskData);
      await createTask(fullTaskData);
    } else if (activeTab === "Project") {
      console.log("Creating project:", projectData);
      await createProject(projectData)
    }
    clearData();
    onClose(); // close modal after creation
  };

  const clearData = ()=>{
    setTaskData({
      title: "",
      description: "",
      priority: 1,
      due_date: "",
      is_completed: false,
      is_favorite: false,
      progress: 0,
      subtasks: [],
      assignees:[],
    });
  }

  const createTask = async (task: Partial<Task>) => {
    try {
      console.log("Submitting task:", JSON.stringify(task, null, 2)); // ✅ not taskData
      const res = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, task);
      console.log("Task Created:", res.data);
    } catch (error: any) {
      console.error("Failed to create task:", error);

      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Status code:", error.response.status);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Other error:", error.message);
      }
    }
  };


  const createProject = async (project: Partial<Project>) => {
    try {
      console.log("Submitting task:", JSON.stringify(projectData, null, 2));
      const res = await axiosInstance.post(API_PATHS.PROJECTS.CREATE_PROJECT, project);
      console.log("Project Created:", res.data);
    } catch (error: any) {
        console.error("Failed to create project:", error);

        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Status code:", error.response.status);
          console.log("Headers:", error.response.headers);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Other error:", error.message);
        }
      }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-2">
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
                onChange={(e) => handleTaskChange("title", e.target.value)}
                className="font-semibold text-2xl border-0 p-0 focus:outline-none"
              />
              <Textarea
                id="task-desc"
                placeholder="Enter the Task Description"
                value={taskData.description}
                onChange={(e) => handleTaskChange("description", e.target.value)}
                className="shadow-none rounded-lg border-0 p-0 min-h-7"
              />
            <div className="flex items-center gap-4 p-0 ">
              {/*Priority Dropdown*/}
              <div>
                <Label className="pb-2">Priority</Label>
                <Select
                  value={String(taskData.priority)}
                  onValueChange={(val) => handleTaskChange("priority", Number(val))}
                > 
              <SelectTrigger className="w-[180px] shadow-none">
                <SelectValue placeholder="Low Priority" />
              </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((p) => (
                    <SelectItem key={p.value} value={String(p.value)}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
            </Select>
            </div>
            <div className="pt-6">
            <NLDatePicker
              selectedDate={taskData.due_date}
              onDateChange={(dateStr) =>
                setTaskData((prev) => ({ ...prev, due_date: dateStr }))
              }
            />
            </div>
            </div>
            {/*Assigned To*/}
            <div className="flex items-center gap-4 p-0">
            {user?.role==="coordinator" || user?.role ==="supervisor" ?(<div>
              <Label className="pb-2">Assigned To</Label>
              <SelectUsers                
                selectedIds={taskData.assignees?.map(a => a.assignee_id) || []}
                setSelectedIds={(ids: string[]) =>
                  setTaskData(prev => ({
                    ...prev,
                    assignees: ids.map(id => ({ assignee_id: id })),
                  }))
                }
                fetchData={fetchStudents}
                renderLabel={(user) => `${user.firstname} ${user.lastname}`}
                title="Assign Users"
              />
            </div>):(
              <></>
            )}           
            </div>

            <SubtasksInput subtask={subtasks} setSubtasks={setSubtasks} />
            </div>
          </TabsContent>


          <TabsContent value="Project" className="pt-4 px-4">
            <div className="grid gap-3">
              <input
                id="project-title"
                placeholder="Project Title"
                value={projectData.title}
                onChange={(e) => handleProjectChange("title", e.target.value)}
                className="font-semibold text-2xl border-0 p-0 focus:outline-none"
              />
              <Textarea
                id="project-desc"
                placeholder="Enter the Project Description"
                value={projectData.description}
                onChange={(e) => handleProjectChange("description", e.target.value)}
                className="shadow-none rounded-lg border-0 p-0 min-h-7"
              />
              
              {/*Priority Dropdown*/}             
            <div className="flex items-center gap-4 p-0 ">

            <div className="pt-6">
              <NLDatePicker
                selectedDate={projectData.due_date}
                onDateChange ={(date) =>
                  setProjectData((prev) => ({ ...prev, due_Date: date }))
                }
              />
            </div>
            </div>

            {/*Assigned To*/}
            <div className="flex items-center gap-4 p-0">
            {user?.role==="coordinator" || user?.role ==="supervisor" ?(<div>
              <Label className="pb-2">Assigned To</Label>
              <SelectUsers                
                selectedIds={projectData.assignees?.map(a => a.assignee_id) || []}
                setSelectedIds={(ids: string[]) =>
                  setTaskData(prev => ({
                    ...prev,
                    assignees: ids.map(id => ({ assignee_id: id })),
                  }))
                }
                fetchData={fetchStudents}
                renderLabel={(user) => `${user.firstname} ${user.lastname}`}
                title="Assign Users"
              />
            </div>):(
              <></>
            )}           
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
