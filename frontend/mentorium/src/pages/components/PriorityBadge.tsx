import React from "react";
import { Badge } from "@/components/ui/badge";

type PriorityBadgeProps = {
  priority: number;
};

const priorityMap: Record<number, { label: string; className: string }> = {
  1: { label: "Low", className: "bg-green-100 text-green-700 border-green-200 font-secondary" },
  2: { label: "Medium", className: "bg-yellow-100 text-yellow-700 border-yellow-200 font-secondary" },
  3: { label: "High", className: "bg-red-100 text-red-700 border-red-200 font-secondary" },
  4: { label: "Critical", className: "bg-orange-100 text-orange-700 border-orange-200 font-secondary" },
  5: { label: "Urgent", className: "bg-purple-100 text-purple-700 border-purple-200 font-secondary" },
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const badge = priorityMap[priority] || {
    label: "Unknown",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <Badge variant="outline" className={badge.className}>
      {badge.label} Priority
    </Badge>
  );
};
