/**
 * Power Flow Result Processing
 * Logic to process power flow results and assign colors for visualization
 */

import type { 
  PowerFlowResults, 
  BusResult, 
  BranchResult,
  ColoredBusResult,
  ColoredBranchResult 
} from '../types/powerFlowResults';
import { voltageToColor, loadingToColor } from '../utils/colorScale';

/**
 * Process bus results and assign colors based on voltage magnitude
 */
export function processBusResults(busResults: BusResult[]): ColoredBusResult[] {
  return busResults.map(bus => ({
    ...bus,
    color: voltageToColor(bus.Vm)
  }));
}

/**
 * Process branch results and assign colors based on loading
 */
export function processBranchResults(branchResults: BranchResult[]): ColoredBranchResult[] {
  return branchResults.map(branch => ({
    ...branch,
    color: loadingToColor(branch.loading)
  }));
}

/**
 * Process full power flow results
 */
export function processPowerFlowResults(results: PowerFlowResults): {
  busResults: ColoredBusResult[];
  branchResults: ColoredBranchResult[];
  converged: boolean;
  gridName: string;
} {
  return {
    busResults: processBusResults(results.bus_results),
    branchResults: processBranchResults(results.branch_results),
    converged: results.converged,
    gridName: results.grid_name
  };
}

/**
 * Create a map from bus index to colored result
 */
export function createBusColorMap(busResults: ColoredBusResult[]): Map<number, [number, number, number]> {
  const map = new Map<number, [number, number, number]>();
  busResults.forEach((bus, index) => {
    map.set(index, bus.color);
  });
  return map;
}

/**
 * Create a map from branch index to colored result
 */
export function createBranchColorMap(branchResults: ColoredBranchResult[]): Map<number, [number, number, number]> {
  const map = new Map<number, [number, number, number]>();
  branchResults.forEach((branch, index) => {
    map.set(index, branch.color);
  });
  return map;
}
