"use client"

import * as React from "react"
import { parseDate } from "chrono-node"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



type NLDatePicker = {
  selectedDate: Date | null
  onDateChange: (date: Date | null) => void
}

export function NLDatePicker({ selectedDate, onDateChange }: NLDatePicker) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("In 2 days")
const [month, setMonth] = React.useState<Date | undefined>(selectedDate ?? undefined)

React.useEffect(() => {
    const parsed = parseDate(value)
    if (parsed) {
      onDateChange(parsed)
      setMonth(parsed)
    }
  }, [value])

const formatDate =(date: Date | undefined) => {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

const handleCalendarSelect = (date: Date | undefined) => {
    if (!date) return
    onDateChange(date)
    setValue(formatDate(date))
    setOpen(false)
  }
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Schedule Date
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="Tomorrow or next week"
          className="bg-background pr-10"
          onChange={(e) => {
            setValue(e.target.value)
            const date = parseDate(e.target.value)
            if (date) {
              setDate(date)
              setMonth(date)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate ?? undefined}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date)
                setValue(formatDate(date))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="text-muted-foreground px-1 pt-0 text-xs font-secondary">
        Your post will be published on{" "}
        <span className="font-medium">{formatDate(selectedDate)}</span>.
      </div>
    </div>
  )
}
