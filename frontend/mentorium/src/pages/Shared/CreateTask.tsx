import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React, { useState } from 'react'
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { PRIORITY_DATA } from '@/utils/data';
import { useLocation, useNavigate} from 'react-router-dom';
import { LucideTrash } from 'lucide-react';
import { description } from '../components/TaskView';
const CreateTask :React.FC= () => {

  const location = useLocation();
  const {taskId} = location.state ||{};
  const navigate = useNavigate();

  const [taskData, settaskData] = useState(
    {
      title: "",
      description: "",
      priority: "Low",
      due_Date : null,
      subtasks:[],
    });

    const [currentTask, setCurrentTask] = useState(null);
    const [error, setError] = useState("");
    const[loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const handleValueChange= (key,value) =>{
      settaskData((prevData) => ({...prevData, [key]:value}));
    }

  const clearData = () =>{
    settaskData({
      title: "",
      description: "",
      priority: "Low",
      due_Date : null,
      subtasks:[],
    })
  }

  const createTask = async() => {};
  const updateTask = async() => {};
  const handleSubmit = async() => {};
  const getTaskDetailsByID = async()=>{};
  const deleteTask = async()=> {};
  
  return (
    <div>
        <div className="px-6 py-8 w-full">
          <div className="w-full flex items-start justify-start">
            <h1 className="text-4xl text-left">Create Task</h1>
          </div>          
        </div>
      <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
      </Card>
</div>
  )
}

export default CreateTask