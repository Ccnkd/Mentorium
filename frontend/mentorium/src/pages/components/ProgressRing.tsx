'use client';

import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  PolarRadiusAxis,
} from 'recharts';

type ProgressRingProps = {
  progress: number; // Value from 0 to 100
  size?: number; // Optional size in px (default is 56)
  strokeColor?: string; // Optional ring color (default green)
};

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 60,
  strokeColor = '#22c55e', // Tailwind green-500
}) => {
  const radius = size / 2;
  const angle = (progress / 100) * 360;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background Circle */}
      <svg width={size} height={size} className="absolute top-0 left-0">
        <circle
          cx={radius}
          cy={radius}
          r={radius - 9}
          stroke="#e5e7eb" // gray-200
          strokeWidth="3"
          fill="none"
        />
      </svg>

      {/* Progress Arc */}
      <RadialBarChart
        width={size}
        height={size}
        cx={radius}
        cy={radius}
        innerRadius="85%"
        outerRadius="100%"
        startAngle={90}
        endAngle={90 - angle}
        data={[{ value: progress }]}
      >
        <PolarRadiusAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
        <RadialBar
          dataKey="value"
          cornerRadius={50}
          fill={strokeColor}
        />
      </RadialBarChart>

      {/* Center Label */}
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">
        {progress}%
      </span>
    </div>
  );
};

export default ProgressRing;
