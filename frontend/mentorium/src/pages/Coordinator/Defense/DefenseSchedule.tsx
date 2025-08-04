import { Button } from '@/components/ui/button'
import PanelCard from '@/pages/components/PanelCard'
import type { Panel} from "../../../utils/types"
import React from 'react'
import { API_PATHS } from '@/utils/apiPaths'
import axiosInstance from '@/utils/axiosInstance'

const DefenseSchedule: React.FC = () => {

const [panels, setPanels] = React.useState<Panel[]>([])
    React.useEffect(() => {    
    const fetchData = async () => {
      const panelRes = await axiosInstance.get(API_PATHS.DEFENSE.GET_PANELS);

      setPanels(panelRes.data);
    };

    fetchData();
  }, []);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Schedule</h1>
        <div className="space-x-2">
          <Button variant="secondary" className="rounded-lg">Edit</Button>
          <Button className="rounded-lg">Export Schedule</Button>
        </div>
      </div>

    <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
        {panels.map((panel) => (
          <PanelCard key={panel.id} panel={panel}/>
        ))}
      </div>
    </div>
  )
}

export default DefenseSchedule