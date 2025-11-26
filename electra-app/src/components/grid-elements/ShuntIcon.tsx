import React from 'react';

interface ShuntIconProps {
  size?: number;
  color?: string;
  isSelected?: boolean;
}

/**
 * Shunt icon component - renders a shunt/capacitor symbol
 * Based on standard electrical symbols for shunt capacitors
 */
const ShuntIcon: React.FC<ShuntIconProps> = ({ 
  size = 30, 
  color = '#ffffff',
  isSelected = false 
}) => {
  const strokeWidth = isSelected ? 2.5 : 2;
  const glowColor = isSelected ? '#67e8f9' : 'none';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isSelected && (
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke={glowColor}
          strokeWidth="3"
          opacity="0.3"
        />
      )}
      
      {/* Connection line from top */}
      <line 
        x1="32" 
        y1="8" 
        x2="32" 
        y2="20" 
        stroke={color} 
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      
      {/* Capacitor plates (two parallel lines) */}
      <line 
        x1="16" 
        y1="20" 
        x2="48" 
        y2="20" 
        stroke={color} 
        strokeWidth={strokeWidth * 1.2}
        strokeLinecap="round"
      />
      <line 
        x1="16" 
        y1="28" 
        x2="48" 
        y2="28" 
        stroke={color} 
        strokeWidth={strokeWidth * 1.2}
        strokeLinecap="round"
      />
      
      {/* Connection line to ground */}
      <line 
        x1="32" 
        y1="28" 
        x2="32" 
        y2="40" 
        stroke={color} 
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      
      {/* Ground symbol (three horizontal lines decreasing in length) */}
      <line 
        x1="16" 
        y1="44" 
        x2="48" 
        y2="44" 
        stroke={color} 
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line 
        x1="20" 
        y1="50" 
        x2="44" 
        y2="50" 
        stroke={color} 
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
      />
      <line 
        x1="24" 
        y1="56" 
        x2="40" 
        y2="56" 
        stroke={color} 
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ShuntIcon;
