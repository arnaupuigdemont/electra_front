/**
 * Power Flow Results Types
 * Type definitions for power flow calculation results
 */

export interface BusResult {
  Vm: number;      // Voltage magnitude (p.u.)
  Va: number;      // Voltage angle (degrees)
  P: number;       // Active power (MW)
  Q: number;       // Reactive power (MVAr)
}

export interface BranchResult {
  Pf: number;      // Active power from (MW)
  Qf: number;      // Reactive power from (MVAr)
  Pt: number;      // Active power to (MW)
  Qt: number;      // Reactive power to (MVAr)
  loading: number; // Loading percentage
  Ploss: number;   // Active power losses (MW)
  Qloss: number;   // Reactive power losses (MVAr)
}

export interface PowerFlowResults {
  grid_name: string;
  converged: boolean;
  error: number;
  bus_results: BusResult[];
  branch_results: BranchResult[];
}

/**
 * Processed results with color information for visualization
 */
export interface ColoredBusResult extends BusResult {
  color: [number, number, number]; // RGB color
}

export interface ColoredBranchResult extends BranchResult {
  color: [number, number, number]; // RGB color
}
