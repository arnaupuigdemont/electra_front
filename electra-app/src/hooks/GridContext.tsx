import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { GridModel, PowerFlowResults } from '../services/gridcalApi';

interface GridCtx {
  model: GridModel | null;
  setModel: (m: GridModel | null) => void;
  selectedGridId: number | null;
  setSelectedGridId: (id: number | null) => void;
  powerFlowResults: PowerFlowResults | null;
  setPowerFlowResults: (results: PowerFlowResults | null) => void;
  isPowerFlowCalculating: boolean;
  setIsPowerFlowCalculating: (isCalculating: boolean) => void;
}

const Ctx = createContext<GridCtx | undefined>(undefined);

export const GridProvider = ({ children }: { children: ReactNode }) => {
  const [model, setModel] = useState<GridModel | null>(null);
  const [selectedGridId, setSelectedGridId] = useState<number | null>(null);
  const [powerFlowResults, setPowerFlowResults] = useState<PowerFlowResults | null>(null);
  const [isPowerFlowCalculating, setIsPowerFlowCalculating] = useState(false);
  return (
    <Ctx.Provider value={{ model, setModel, selectedGridId, setSelectedGridId, powerFlowResults, setPowerFlowResults, isPowerFlowCalculating, setIsPowerFlowCalculating }}>
      {children}
    </Ctx.Provider>
  );
};

export function useGridModel() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useGridModel must be inside GridProvider');
  return ctx;
}