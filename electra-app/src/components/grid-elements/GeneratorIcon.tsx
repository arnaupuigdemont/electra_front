import React from 'react';

interface GeneratorIconProps {
  size?: number;
  color?: string;
  isSelected?: boolean;
}

/**
 * Generator icon component - renders a generator symbol (circle with G)
 * Based on standard electrical symbols for synchronous generators
 */
const GeneratorIcon: React.FC<GeneratorIconProps> = ({ 
  size = 30, 
  color = '#ffffff',
  isSelected = false 
}) => {
  const strokeWidth = isSelected ? 2.5 : 2;
  const glowColor = isSelected ? '#f9a8d4' : 'none';
  
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
      
      {/* Outer circle */}
      <circle 
        cx="32" 
        cy="32" 
        r="24" 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth}
      />
      
      {/* Inner circle for depth */}
      <circle 
        cx="32" 
        cy="32" 
        r="20" 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth * 0.7}
        opacity="0.5"
      />
      
      {/* Letter G */}
      <text
        x="32"
        y="32"
        fontSize="28"
        fontWeight="bold"
        fill={color}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Arial, sans-serif"
      >
        G
      </text>
    </svg>
  );
};

export default GeneratorIcon;
