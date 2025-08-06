import * as React from "react"
import { Button } from "@/components/ui/button"
import PanelCard from "../../components/PanelCard"
import type { Panel, Lecturer } from "../../../utils/types"
import ShufflePreviewModal from '../../components/ShufflePreviewModal';
import axiosInstance from "@/utils/axiosInstance"
import { API_PATHS } from "@/utils/apiPaths"

export const PanelPage: React.FC = () => {
  const [panels, setPanels] = React.useState<Panel[]>([])
  const [lecturers, setLecturers] = React.useState<Lecturer[]>([])
  const [shuffledPanels, setShuffledPanels] = React.useState<Panel[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const panelRes = await axiosInstance.get(API_PATHS.DEFENSE.GET_PANELS);
      const lecturerRes = await axiosInstance.get(API_PATHS.USERS.GET_LECTURERS);

      if (panelRes?.data) {
        setPanels(panelRes.data);
      } else {
        console.warn("No panel data received:", panelRes);
      }

      if (lecturerRes?.data?.users) {
        setLecturers(lecturerRes.data.users);
      } else {
        console.warn("No lecturer data received:", lecturerRes);
      }

    };

    fetchData();
  }, []);

  const handleCreatePanel = async () => {
    try {
      const response = await axiosInstance.post(API_PATHS.DEFENSE.CREATE_PANEL) // POST to your backend
      const newPanel = response.data // expects: { id, name, lecturers }

      setPanels((prev) => [...prev, newPanel])
    } catch (error) {
      console.error("Failed to create panel:", error)
    }
  }

  const shuffleLecturers = () => {
    const shuffled = [...lecturers].sort(() => Math.random() - 0.5);
    const result = panels.map(panel => ({ ...panel, lecturers: [] as Lecturer[]}));

    shuffled.forEach((lecturer, index) => {
      result[index % result.length].lecturers.push(lecturer);
    });

    setShuffledPanels(result);
    setIsModalOpen(true);
  };

  const handleEditPanel = (panelId: string)=>{
    console.log("WIll Edit soon!")
  };

const handleSaveShuffled = async () => {
  try {
    const assignments = shuffledPanels.flatMap(panel =>
      panel.lecturers.map(lecturer => ({
        panelId: panel.id,
        lecturerId: lecturer.user_id,
      }))
    );

    console.log("Sending assignments:", assignments);

    const res = await axiosInstance.post(API_PATHS.DEFENSE.ASSIGN_PANEL, { assignments });

    console.log("Response:", res.data);
    setIsModalOpen(false);
    alert('Assignments saved!');
  } catch (error: any) {
    console.error("Assignment failed:", error.response?.data || error.message);
    alert(`Assignment failed: ${error.response?.data?.message || error.message}`);
  }
};

  const handleDeletePanel = async(id: string) => {
     try {
      await axiosInstance.delete(API_PATHS.DEFENSE.DELETE_PANEL(id))
      setPanels((prev) => prev.filter(p => p.id !== id))
    } catch (error) {
      console.error("Error deleting panel", error)
    }
  }


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Panels</h1>
        <div className="space-x-2">
          <Button onClick={shuffleLecturers} variant="secondary" className="rounded-lg">Shuffle Lecturers</Button>
          <Button onClick={handleCreatePanel} className="rounded-lg">Create Panel</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {panels.map((panel) => (
          <PanelCard key={panel.id} panel={panel} onDelete={handleDeletePanel} onEdit={handleEditPanel}/>
        ))}
      </div>
      
      <ShufflePreviewModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shuffledPanels={shuffledPanels}
        onSave={handleSaveShuffled}
      />
    </div>
  )
}
