import React, { useState, type PropsWithChildren } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { Calendar, MoreVertical, Star } from 'lucide-react';

const TaskCard: React.FC<PropsWithChildren> = () => {
    const [isFavorite, setIsFavorite] = useState(false)
    const chartData = [{ name: "Progress", value: 10 }]
    const progress = chartData[0].value

  return (
    <Card className="w-full border px-4 py-3">
      <CardContent className="flex items-center justify-between gap-3 p-0">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Checkbox */}
          <Checkbox className="rounded-full border-gray-300" />

          {/* Info */}
          <div className="flex flex-col gap-1">
            {/* Top Row: Badge + Date */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                Low Priority
              </Badge>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>June 4</span>
              </div>
            </div>

            {/* Task Title */}
            <div className="text-md font-medium text-grey">Task Title 3</div>
          </div>
        </div>

        {/* Right Section: Favorite, Progress, Menu */}
        <div className="flex items-center gap-3">
          {/* Favorite Toggle */}
          <button onClick={() => setIsFavorite(!isFavorite)} className="text-muted-foreground">
            {isFavorite ? <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" /> : <Star className="w-4 h-4" />}
          </button>

          {/* Progress Ring */}
          <div className="w-10 h-10">
            <RadialBarChart
              width={50}
              height={50}
              innerRadius="80%"
              outerRadius="100%"
              data={chartData}
              startAngle={90}
              endAngle={-270}
            >
              <PolarRadiusAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
              <RadialBar
                background
                dataKey="value"
                cornerRadius={5}
                fill="#4ade80"
              />

            </RadialBarChart>
          </div>

          {/* More menu icon */}
          <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskCard