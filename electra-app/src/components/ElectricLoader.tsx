import React from 'react';
import '../styles/components/ElectricLoader.css';

const ElectricLoader: React.FC = () => {
  return (
    <div className="electric-loader-container">
      <svg className="ecg-line" viewBox="0 0 600 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(75, 130, 249, 0.57)" />
            <stop offset="10%" stopColor="rgba(37, 233, 64, 1)" />
            <stop offset="25%" stopColor="rgba(27, 252, 207, 1)" />
            <stop offset="40%" stopColor="rgba(37, 233, 64, 1)" />
            <stop offset="100%" stopColor="rgba(62, 121, 248, 0.33)" />
          </linearGradient>
        </defs>
        {/* ECG pulse wave */}
        <path className="ecg-pulse" 
          d="M 0 50 L 100 50 L 110 50 L 115 20 L 120 80 L 130 35 L 140 50 L 600 50" />
      </svg>
    </div>
  );
};

export default ElectricLoader;
