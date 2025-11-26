import React from 'react';

interface TransformerIconProps {
  size?: number;
  color?: string;
  isSelected?: boolean;
}

/**
 * Transformer icon component - renders a transformer symbol with two coils
 * Based on standard electrical symbols for transformers
 */
const TransformerIcon: React.FC<TransformerIconProps> = ({ 
  size = 24, 
  color = '#ffffff',
  isSelected = false 
}) => {
  const strokeWidth = isSelected ? 2.5 : 2;
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
          x="4"
          y="4"
          width="56"
          height="56"
          fill="none"
          stroke={glowColor}
          strokeWidth="3"
          opacity="0.3"
          rx="4"
        />
      )}
      
      {/* Left coil (primary) */}
      <circle 
        cx="22" 
        cy="32" 
        r="12" 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth}
      />
      
      {/* Right coil (secondary) */}
      <circle 
        cx="42" 
        cy="32" 
        r="12" 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth}
      />
      
      {/* Vertical separation line between coils */}
      <line 
        x1="32" 
        y1="16" 
        x2="32" 
        y2="48" 
        stroke={color} 
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
      />
      
      {/* Connection lines */}
      <line 
        x1="4" 
        y1="32" 
        x2="10" 
        y2="32" 
        stroke={color} 
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line 
        x1="54" 
        y1="32" 
        x2="60" 
        y2="32" 
        stroke={color} 
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default TransformerIcon;
