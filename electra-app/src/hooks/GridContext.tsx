import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { GridModel } from '../services/gridcalApi';

interface GridCtx {
  model: GridModel | null;
  setModel: (m: GridModel | null) => void;
}

const Ctx = createContext<GridCtx | undefined>(undefined);

export const GridProvider = ({ children }: { children: ReactNode }) => {
  const [model, setModel] = useState<GridModel | null>(null);
  return <Ctx.Provider value={{ model, setModel }}>{children}</Ctx.Provider>;
};

export function useGridModel() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useGridModel must be inside GridProvider');
  return ctx;
}