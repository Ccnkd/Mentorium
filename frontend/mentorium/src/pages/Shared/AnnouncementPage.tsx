import { useUserAuth } from '@/hooks/useUserAuth';
import { UserContext } from '@/contexts/UserContext';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import type { Announcement } from '@/utils/types';
import {Volume2Icon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import AnnouncementCard from '../components/AnnouncementCard';

const AnnouncementPage :React.FC= () => {
  useUserAuth();
  const{user} = useContext(UserContext);
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
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
            <Volume2Icon className="text-muted-foreground size-5" />
            </div>
            <h1 className="text-4xl font-semibold text-grey">Announcements</h1>
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