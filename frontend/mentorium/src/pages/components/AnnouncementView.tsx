import React, { type PropsWithChildren } from 'react'
import {
  Card,
  CardContent,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Volume2 } from 'lucide-react'

const AnnouncementView: React.FC<PropsWithChildren> = () => {
  return (
    <div>
        <Card className="@container/card w-full gap-1">
        <CardHeader>
            <div className="w-full flex items-center justify-start gap-3">
                <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                    <Volume2 className="size-5" />
                </div>
                <CardTitle className="font-semibold text-3xl text-grey">
                This is an Announcement</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex-col">
            <div className="font-secondary text-grey">
                This is still being worked on. API calls will be made to fill this section in due time.
          </div>
        </CardContent>
        <CardFooter className="flex-col font-secondary text-grey items-end">
            <div className="line-clamp-1 flex gap-2 text-md ">
                Dr. Thess
          </div>
            <div className="line-clamp-1 flex gap-2 text-xs">
                4th July,2025
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AnnouncementView