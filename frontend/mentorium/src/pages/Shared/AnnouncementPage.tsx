import { useUserAuth } from '@/hooks/useUserAuth';
import { UserContext } from '@/contexts/UserContext';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import type { Announcement } from '@/utils/types';
import {PlusCircle, Volume2Icon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import AnnouncementCard from '../components/AnnouncementCard';
import { Button } from '@/components/ui/button';
import AnnouncementForm from '../components/AnnouncementForm';

const AnnouncementPage :React.FC= () => {
  useUserAuth();
  const{user} = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const [announcements, setAnnouncement] = useState<Announcement[]>([]);

  useEffect(()=>{
    const fetchData = async ()=>{
    try {
      const announcementRes = await axiosInstance.get(API_PATHS.ANNOUNCEMENT.GET_ANNOUNCEMENTS);
      setAnnouncement(announcementRes.data.announcements); // Adjust based on actual structure
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
    }

    fetchData();
  },[]);
  return (
        <div className="px-6 py-8 w-full">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white w-full flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
            <Volume2Icon className="text-muted-foreground size-5" />
            </div>
            <h1 className="text-4xl font-semibold text-grey">Announcements</h1>
            
            <div className="ml-auto">
              <Button
                className="text-md bg-white border-none text-primary shadow-none hover:bg-white hover:cursor-pointer hover:text-primary/65"
                onClick={() => setShowForm(true)}
              >
                <PlusCircle />
                Create Announcement
              </Button>
            </div>
        </div>

        <div className='pb-7'>
        <AnnouncementForm
          open={showForm}
          onCancel={() => setShowForm(false)}
        />
        </div>
        {/* Announcements Grid */}
        <div className='flex grid gap-2'>
            {announcements.length > 0 ? (
            announcements.map((announcement) => (
                <AnnouncementCard
                key={announcement.announcement_id}
                announcement={announcement}
                />
            ))
            ) : (
            <div className="col-span-full text-center text-muted-foreground py-8">
                No announcements available.
            </div>
            )}
        </div>
        </div>

    
  )
}

export default AnnouncementPage