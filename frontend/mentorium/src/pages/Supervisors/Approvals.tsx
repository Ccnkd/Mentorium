import { useUserAuth } from "@/hooks/useUserAuth";
import { UserContext } from "@/contexts/UserContext";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import type { Announcement } from "@/utils/types";
import React, { useContext, useEffect, useState } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import { Button } from "@/components/ui/button";
import PageHeader from "../components/PageHeader";
import { SquareCheckBigIcon } from "lucide-react";

const Approvals: React.FC = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const [announcements, setAnnouncement] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const announcementRes = await axiosInstance.get(
          API_PATHS.ANNOUNCEMENT.GET_ANNOUNCEMENTS
        );
        setAnnouncement(announcementRes.data.announcements); // Adjust based on actual structure
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="px-6 py-8 w-full">
      {/* Header */}
      <PageHeader title="Approvals" icon={SquareCheckBigIcon} />

      {/* Announcements Grid */}
      <div className="flex grid gap-2">
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
  );
};

export default Approvals;
