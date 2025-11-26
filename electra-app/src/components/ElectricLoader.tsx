import React from 'react';
import '../styles/components/ElectricLoader.css';

interface ElectricLoaderProps {
  message?: string;
}

const ElectricLoader: React.FC<ElectricLoaderProps> = ({ message = 'Loading grid...' }) => {
  return (
    <div className="electric-loader-container">
      <div className="electric-loader">
        <div className="electric-line">
          <div className="electric-pulse"></div>
          <div className="electric-pulse electric-pulse-delay-1"></div>
          <div className="electric-pulse electric-pulse-delay-2"></div>
        </div>
        <div className="electric-glow"></div>
      </div>
      <p className="electric-loader-message">{message}</p>
    </div>
  );
};

export default ElectricLoader;
