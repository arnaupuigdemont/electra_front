import React, { useEffect, useState } from 'react';
import '../styles/components/CalculatorLoader.css';

const CalculatorLoader: React.FC = () => {
  const [displayOperation, setDisplayOperation] = useState<string>('');

  useEffect(() => {
    const operations = [
      () => {
        const a = (Math.random() * 100).toFixed(2);
        const b = (Math.random() * 100).toFixed(2);
        return `${a} + ${b}`;
      },
      () => {
        const a = (Math.random() * 100).toFixed(2);
        const b = (Math.random() * 100).toFixed(2);
        return `${a} × ${b}`;
      },
      () => {
        const a = (Math.random() * 100).toFixed(2);
        const b = (Math.random() * 10 + 1).toFixed(2);
        return `${a} ÷ ${b}`;
      },
      () => {
        const a = (Math.random() * 50).toFixed(2);
        return `√${a}`;
      },
      () => {
        const a = (Math.random() * 10).toFixed(2);
        const b = (Math.random() * 3).toFixed(0);
        return `${a}^${b}`;
      },
    ];

    const operationInterval = setInterval(() => {
      const randomOp = operations[Math.floor(Math.random() * operations.length)];
      setDisplayOperation(randomOp());
    }, 200);

    return () => {
      clearInterval(operationInterval);
    };
  }, []);

  return (
    <div className="calculator-loader-container">
      <div className="display-numbers">
        {displayOperation}
      </div>
    </div>
  );
};

export default CalculatorLoader;
