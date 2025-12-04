import React from 'react';

interface BusIconProps {
  size?: number;
  color?: string;
  isSelected?: boolean;
}

/**
 * Bus icon component - renders a simple white rectangle
 */
const BusIcon: React.FC<BusIconProps> = ({ 
  size = 48, 
  color = '#ffffff',
  isSelected = false 
}) => {
  const strokeWidth = isSelected ? 3 : 2;
  const glowColor = isSelected ? '#60a5fa' : 'none';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isSelected && (
        <rect
          x="8"
          y="20"
          width="28"
          height="24"
          fill="none"
          stroke={glowColor}
          strokeWidth="4"
          opacity="0.5"
          rx="2"
        />
      )}
      
      {/* Simple white rectangle */}
      <rect
        x="12"
        y="28"
        width="40"
        height="8"
        fill={color}
        stroke={color}
        strokeWidth={strokeWidth}
        rx="1"
      />
    </svg>
  );
};

export default BusIcon;
