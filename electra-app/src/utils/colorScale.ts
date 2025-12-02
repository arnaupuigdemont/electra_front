/**
 * Color Scale Utilities
 * Functions to map numerical values to color scales
 */

/**
 * Maps a value from a range to a red-green color scale
 * @param value - The value to map
 * @param min - Minimum value of the range
 * @param max - Maximum value of the range
 * @returns RGB color array [r, g, b] where each component is 0-255
 * 
 * Red (bad) -> Yellow (medium) -> Green (good)
 */
export function valueToRedGreenColor(
  value: number,
  min: number,
  max: number
): [number, number, number] {
  // Clamp value to range
  const clampedValue = Math.max(min, Math.min(max, value));
  
  // Normalize to 0-1
  const normalized = (clampedValue - min) / (max - min);
  
  // Map to red-green scale
  // 0 (normalized) -> red [255, 0, 0]
  // 0.5 -> yellow [255, 255, 0]
  // 1.0 -> green [0, 255, 0]
  
  let r: number, g: number, b: number;
  
  if (normalized < 0.5) {
    // Red to yellow
    r = 255;
    g = Math.round(normalized * 2 * 255);
    b = 0;
  } else {
    // Yellow to green
    r = Math.round((1 - normalized) * 2 * 255);
    g = 255;
    b = 0;
  }
  
  return [r, g, b];
}

/**
 * Maps a value to a green-red scale (inverted: higher is worse)
 * Useful for loading, losses, etc.
 */
export function valueToGreenRedColor(
  value: number,
  min: number,
  max: number
): [number, number, number] {
  // Invert the scale
  return valueToRedGreenColor(max - value + min, min, max);
}

/**
 * Get color for voltage magnitude (nominal = 1.0 p.u.)
 * Good range: 0.95 - 1.05
 */
export function voltageToColor(vm: number): [number, number, number] {
  const deviation = Math.abs(vm - 1.0);
  const maxDeviation = 0.1; // 10% deviation is critical
  
  // Invert: less deviation = better (green)
  return valueToGreenRedColor(deviation, 0, maxDeviation);
}

/**
 * Get color for branch loading (percentage)
 * Good: 0-70%, Warning: 70-90%, Critical: 90-100%+
 */
export function loadingToColor(loading: number): [number, number, number] {
  const absLoading = Math.abs(loading);
  // Higher loading = worse (red)
  return valueToGreenRedColor(absLoading, 0, 100);
}
