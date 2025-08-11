import React from 'react'
import type { Announcement } from "../../utils/types"
import {
  Card,
  CardContent,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Megaphone, Volume2 } from 'lucide-react'

type AnnouncementProps = {
  announcement: Announcement;
}
const AnnouncementCard: React.FC<AnnouncementProps> = ({announcement}) => {
  const date = new Date(announcement.created_at);
  const fullName = announcement.lecturer
  ? `${announcement.lecturer.title} ${announcement.lecturer.users.firstname} ${announcement.lecturer.users.lastname}`
  : "Unknown";
  const formatted = date.toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
  return (
    <div>
        <Card className="@container/card w-full gap-1">
        <CardHeader>
            <div className="w-full flex items-center justify-start gap-3">
                <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                    <Megaphone className="size-5 text-muted-foreground" />
                </div>
                <CardTitle className="font-semibold text-3xl text-grey">
                {announcement.title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex-col">
            <div className="font-secondary text-grey">
                {announcement.description}
          </div>
        </CardContent>
        <CardFooter className="flex-col font-secondary text-grey items-end">
            <div className="line-clamp-1 flex gap-2 text-md ">
                {fullName}
          </div>
            <div className="line-clamp-1 flex gap-2 text-xs">
                {formatted}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AnnouncementCard