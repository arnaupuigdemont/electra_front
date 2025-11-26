import { renderToStaticMarkup } from 'react-dom/server';
import { ReactElement } from 'react';

/**
 * Converts a React SVG component to a data URL that can be used as an image source
 */
export function svgToDataUrl(component: ReactElement): string {
  const svgString = renderToStaticMarkup(component);
  const base64 = btoa(svgString);
  return `data:image/svg+xml;base64,${base64}`;
}
