import type { Bus, Line, Transformer2W } from '../services/gridcalApi';

interface BusResult {
  Vm: number;
  Va: number;
  P: number;
  Q: number;
}

interface BranchResult {
  Pf: number;
  Qf: number;
  Pt: number;
  Qt: number;
  loading: number;
  Ploss: number;
  Qloss: number;
}

export interface PowerFlowExportData {
  busResults: BusResult[];
  branchResults: BranchResult[];
  buses: Bus[];
  orderedBusIds: number[];
  orderedLines: Line[];
  orderedTransformers: Transformer2W[];
  converged: boolean;
  error: number;
}

/**
 * Format a number to a fixed number of decimal places
 */
function formatNumber(n: number, decimals = 4): string {
  if (n == null || isNaN(n)) return '-';
  return n.toFixed(decimals);
}

/**
 * Escape a string for CSV (handles commas and quotes)
 */
function escapeCSV(str: string): string {
  return `"${str.replace(/"/g, '""')}"`;
}

/**
 * Generate CSV content from power flow results
 * Uses semicolon as delimiter for Excel compatibility in European locales
 */
export function generatePowerFlowCSV(data: PowerFlowExportData): string {
  const {
    busResults,
    branchResults,
    buses,
    orderedBusIds,
    orderedLines,
    orderedTransformers,
    converged,
    error
  } = data;

  // Create bus name map
  const busNameMap = new Map<number, string>();
  buses.forEach(b => busNameMap.set(b.id, b.name || b.idtag));

  let csv = '';
  
  // Add header info
  csv += 'Power Flow Results\n';
  csv += `Status;${converged ? 'Converged' : 'Not Converged'}\n`;
  csv += `Error;${formatNumber(error, 6)}\n\n`;
  
  // Bus Results Table
  csv += 'BUS RESULTS\n';
  csv += '#;Bus;Vm (pu);Va (°);P (MW);Q (MVAr)\n';
  busResults.forEach((result, index) => {
    const busId = orderedBusIds[index];
    const busName = busNameMap.get(busId) || `Bus ${index + 1}`;
    csv += `${index + 1};${escapeCSV(busName)};${formatNumber(result.Vm)};${formatNumber(result.Va, 2)};${formatNumber(result.P, 2)};${formatNumber(result.Q, 2)}\n`;
  });
  
  csv += '\n';
  
  // Branch Results Table
  csv += 'BRANCH RESULTS\n';
  csv += '#;Name;Type;Pf (MW);Pt (MW);Loading (%);Ploss (MW);Qloss (MVAr)\n';
  branchResults.forEach((result, index) => {
    const isLine = index < orderedLines.length;
    let branchName: string;
    if (isLine) {
      const line = orderedLines[index];
      branchName = line?.name || line?.idtag || `Line ${index + 1}`;
    } else {
      const txIndex = index - orderedLines.length;
      const transformer = orderedTransformers[txIndex];
      branchName = transformer?.name || transformer?.idtag || `Tx ${txIndex + 1}`;
    }
    const branchType = isLine ? 'Line' : 'Transformer';
    csv += `${index + 1};${escapeCSV(branchName)};${branchType};${formatNumber(result.Pf, 2)};${formatNumber(result.Pt, 2)};${formatNumber(result.loading, 1)};${formatNumber(result.Ploss, 4)};${formatNumber(result.Qloss, 4)}\n`;
  });
  
  return csv;
}

/**
 * Download a string as a file
 */
export function downloadAsFile(content: string, filename: string, mimeType = 'text/csv;charset=utf-8;'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate and download power flow results as CSV
 */
export function downloadPowerFlowCSV(data: PowerFlowExportData): void {
  const csv = generatePowerFlowCSV(data);
  const filename = `power_flow_results_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.csv`;
  downloadAsFile(csv, filename);
}
