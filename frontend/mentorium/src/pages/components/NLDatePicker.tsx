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

type NLDatePickerProps = {
  selectedDate?: string  // ISO string passed from parent
  onDateChange: (dateString: string) => void
}

export function NLDatePicker({ selectedDate, onDateChange }: NLDatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("In 2 days")

  // Convert incoming string to Date
  const initialDate = selectedDate ? new Date(selectedDate) : null
  const [tempDate, setTempDate] = React.useState<Date | null>(initialDate)
  const [month, setMonth] = React.useState<Date | undefined>(initialDate ?? undefined)

  React.useEffect(() => {
    const parsed = parseDate(value)
    if (parsed) {
      setTempDate(parsed)
      onDateChange(parsed.toISOString()) // ✅ Convert to ISO string
      setMonth(parsed)
    }
  }, [value])

  const formatDate = (date: Date | undefined) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const handleCalendarSelect = (date: Date | undefined) => {
    if (!date) return
    setTempDate(date)
    onDateChange(date.toISOString()) // ✅ Convert to ISO string
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
            const input = e.target.value
            setValue(input)
            const date = parseDate(input)
            if (date) {
              setTempDate(date)
              onDateChange(date.toISOString()) // ✅ ISO output
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
              selected={tempDate ?? undefined}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleCalendarSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="text-muted-foreground px-1 pt-0 text-xs font-secondary">
        Your post will be published on{" "}
        <span className="font-medium">{formatDate(tempDate ?? undefined)}</span>.
      </div>
    </div>
  )
}
