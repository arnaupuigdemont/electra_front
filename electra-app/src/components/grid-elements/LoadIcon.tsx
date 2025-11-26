import React from 'react';

interface LoadIconProps {
  size?: number;
  color?: string;
  isSelected?: boolean;
}

/**
 * Load icon component - renders a load symbol (arrow pointing down into a resistance)
 * Based on standard electrical symbols for loads
 */
const LoadIcon: React.FC<LoadIconProps> = ({ 
  size = 30, 
  color = '#ffffff',
  isSelected = false 
}) => {
  const strokeWidth = isSelected ? 2.5 : 2;
  const glowColor = isSelected ? '#d8b4fe' : 'none';
  
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
      
      {/* Arrow pointing down */}
      <line 
        x1="32" 
        y1="8" 
        x2="32" 
        y2="32" 
        stroke={color} 
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <polygon
        points="32,38 24,26 40,26"
        fill={color}
        stroke={color}
        strokeWidth={strokeWidth * 0.5}
      />
      
      {/* Zigzag resistance symbol */}
      <path
        d="M 18 40 L 22 45 L 26 35 L 30 45 L 34 35 L 38 45 L 42 35 L 46 40"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Base line */}
      <line 
        x1="16" 
        y1="52" 
        x2="48" 
        y2="52" 
        stroke={color} 
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line 
        x1="20" 
        y1="56" 
        x2="44" 
        y2="56" 
        stroke={color} 
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LoadIcon;
