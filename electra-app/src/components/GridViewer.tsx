import React, { useEffect, useMemo, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { OrthographicView } from '@deck.gl/core';
import { LineLayer } from '@deck.gl/layers';
import * as DeckLayers from '@deck.gl/layers';
import { listBuses, listLines, listTransformers2w, listGenerators, listShunts, listLoads, getBus, getLoad, getGenerator, getShunt, getLine, getTransformer2W } from '../services/gridcalApi';
import type { Bus, Line, Transformer2W, Generator, Shunt, Load, BusDetails } from '../services/gridcalApi';
import InfoPanel, { type SelectedItem } from './InfoPanel';
import { useGridModel } from '../hooks/GridContext';
import ElectricLoader from './ElectricLoader';
import BusIcon from './grid-elements/BusIcon';
import GeneratorIcon from './grid-elements/GeneratorIcon';
import LoadIcon from './grid-elements/LoadIcon';
import ShuntIcon from './grid-elements/ShuntIcon';
import TransformerIcon from './grid-elements/TransformerIcon';
import { svgToDataUrl } from '../utils/svgToDataUrl';

type ViewState = {
  target: [number, number, number];
  zoom: number;
  rotationX?: number;
  rotationOrbit?: number;
};

const initialView: ViewState = { target: [0, 0, 0], zoom: -1 };

const GridViewer: React.FC = () => {
  const { selectedGridId } = useGridModel();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [transformers, setTransformers] = useState<Transformer2W[]>([]);
  const [generators, setGenerators] = useState<Generator[]>([]);
  const [shunts, setShunts] = useState<Shunt[]>([]);
  const [loads, setLoads] = useState<Load[]>([]);
  const [viewState, setViewState] = useState<ViewState>(initialView);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<SelectedItem | null>(null);
  const [busDetails, setBusDetails] = useState<BusDetails | null>(null);
  const [busDetailsCache, setBusDetailsCache] = useState<Record<number, BusDetails>>({});
  const [loadDetails, setLoadDetails] = useState<Load | null>(null);
  const [loadDetailsCache, setLoadDetailsCache] = useState<Record<number, Load>>({});
  const [generatorDetails, setGeneratorDetails] = useState<Generator | null>(null);
  const [generatorDetailsCache, setGeneratorDetailsCache] = useState<Record<number, Generator>>({});
  const [shuntDetails, setShuntDetails] = useState<Shunt | null>(null);
  const [shuntDetailsCache, setShuntDetailsCache] = useState<Record<number, Shunt>>({});
  const [lineDetails, setLineDetails] = useState<Line | null>(null);
  const [lineDetailsCache, setLineDetailsCache] = useState<Record<number, Line>>({});
  const [transformerDetails, setTransformerDetails] = useState<Transformer2W | null>(null);
  const [transformerDetailsCache, setTransformerDetailsCache] = useState<Record<number, Transformer2W>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedGridId == null) return;
    (async () => {
      setIsLoading(true);
      try {
        const [bs, ls, ts, gs, ss, ld] = await Promise.all([
          listBuses(),
          listLines(),
          listTransformers2w(),
          listGenerators(),
          listShunts(),
          listLoads(),
        ]);
        setBuses(bs);
        setLines(ls);
        setTransformers(ts);
        setGenerators(gs);
        setShunts(ss);
        setLoads(ld);
      } catch (e: any) {
        setError(e?.message || 'Failed to load grid data');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedGridId]);

  // Fetch extra bus details when a bus is selected
  useEffect(() => {
    const run = async () => {
      if (!selected || selected.kind !== 'bus') { setBusDetails(null); return; }
      const b = selected.data as Bus;
      if (b?.id == null) { setBusDetails(null); return; }
      // cache first
      const cached = busDetailsCache[b.id];
      if (cached) { setBusDetails(cached); return; }
      try {
        const det = await getBus(b.id);
        setBusDetails(det);
        setBusDetailsCache(prev => ({ ...prev, [b.id]: det }));
      } catch (e) {
        // ignore; panel will show base fields only
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Fetch extra load details when a load is selected
  useEffect(() => {
    const run = async () => {
      if (!selected || selected.kind !== 'load') { setLoadDetails(null); return; }
      const loadData = selected.data as any;
      // Try to get id from the load object if it exists
      const loadId = loadData?.id;
      if (loadId == null) { setLoadDetails(null); return; }
      // cache first
      const cached = loadDetailsCache[loadId];
      if (cached) { setLoadDetails(cached); return; }
      try {
        const det = await getLoad(loadId);
        setLoadDetails(det);
        setLoadDetailsCache(prev => ({ ...prev, [loadId]: det }));
      } catch (e) {
        // ignore; panel will show base fields only
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Fetch extra generator details when a generator is selected
  useEffect(() => {
    const run = async () => {
      if (!selected || selected.kind !== 'generator') { setGeneratorDetails(null); return; }
      const genData = selected.data as any;
      const genId = genData?.id;
      if (genId == null) { setGeneratorDetails(null); return; }
      const cached = generatorDetailsCache[genId];
      if (cached) { setGeneratorDetails(cached); return; }
      try {
        const det = await getGenerator(genId);
        setGeneratorDetails(det);
        setGeneratorDetailsCache(prev => ({ ...prev, [genId]: det }));
      } catch (e) {
        // ignore; panel will show base fields only
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Fetch extra shunt details when a shunt is selected
  useEffect(() => {
    const run = async () => {
      if (!selected || selected.kind !== 'shunt') { setShuntDetails(null); return; }
      const shuntData = selected.data as any;
      const shuntId = shuntData?.id;
      if (shuntId == null) { setShuntDetails(null); return; }
      const cached = shuntDetailsCache[shuntId];
      if (cached) { setShuntDetails(cached); return; }
      try {
        const det = await getShunt(shuntId);
        setShuntDetails(det);
        setShuntDetailsCache(prev => ({ ...prev, [shuntId]: det }));
      } catch (e) {
        // ignore; panel will show base fields only
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Fetch extra line details when a line is selected
  useEffect(() => {
    const run = async () => {
      if (!selected || selected.kind !== 'line') { setLineDetails(null); return; }
      const lineData = selected.data as any;
      const lineId = lineData?.id;
      if (lineId == null || typeof lineId !== 'number') { 
        console.warn('Line selected without valid id:', lineData);
        setLineDetails(null); 
        return; 
      }
      const cached = lineDetailsCache[lineId];
      if (cached) { setLineDetails(cached); return; }
      try {
        const det = await getLine(lineId);
        setLineDetails(det);
        setLineDetailsCache(prev => ({ ...prev, [lineId]: det }));
      } catch (e) {
        console.error('Failed to load line details:', e);
        // ignore; panel will show base fields only
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Fetch extra transformer details when a transformer is selected
  useEffect(() => {
    const run = async () => {
      if (!selected || selected.kind !== 'transformer') { setTransformerDetails(null); return; }
      const transformerData = selected.data as any;
      const transformerId = transformerData?.id;
      if (transformerId == null) { setTransformerDetails(null); return; }
      const cached = transformerDetailsCache[transformerId];
      if (cached) { setTransformerDetails(cached); return; }
      try {
        const det = await getTransformer2W(transformerId);
        setTransformerDetails(det);
        setTransformerDetailsCache(prev => ({ ...prev, [transformerId]: det }));
      } catch (e) {
        // ignore; panel will show base fields only
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const filtered = useMemo(() => {
    if (selectedGridId == null) return { buses: [], lines: [], transformers: [], generators: [], shunts: [], loads: [] };
    const fb = buses.filter(b => b.grid_id === selectedGridId);
    const fl = lines.filter(l => l.grid_id === selectedGridId);
    const ft = transformers.filter(t => t.grid_id === selectedGridId);
    const fg = generators.filter(g => g.grid_id === selectedGridId);
    const fs = shunts.filter(s => s.grid_id === selectedGridId);
    const fld = loads.filter(d => d.grid_id === selectedGridId);
    return { buses: fb, lines: fl, transformers: ft, generators: fg, shunts: fs, loads: fld };
  }, [buses, lines, transformers, generators, shunts, loads, selectedGridId]);

  // Compute bounds to center/zoom
  useEffect(() => {
    if (filtered.buses.length === 0) return;
    const xs = filtered.buses.map(b => b.x);
    const ys = filtered.buses.map(b => b.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    // zoom heuristic based on span
    const span = Math.max(maxX - minX, maxY - minY) || 1;
    const zoom = -Math.log2(span / 1000); // adjust constant as needed
    setViewState(v => ({ ...v, target: [cx, cy, 0], zoom }));
  }, [filtered.buses]);

  // Convert SVG components to data URLs
  const BUS_ICON_URL = useMemo(() => svgToDataUrl(<BusIcon size={64} />), []);
  const GENERATOR_ICON_URL = useMemo(() => svgToDataUrl(<GeneratorIcon size={64} />), []);
  const LOAD_ICON_URL = useMemo(() => svgToDataUrl(<LoadIcon size={64} />), []);
  const SHUNT_ICON_URL = useMemo(() => svgToDataUrl(<ShuntIcon size={64} />), []);
  const TRANSFORMER_ICON_URL = useMemo(() => svgToDataUrl(<TransformerIcon size={64} />), []);

  // Base sizes (scaled later by zoomMult)
  const BUS_ICON_SIZE_PX = 72;
  const BUS_TEXT_SIZE_PX = 14;
  const LOAD_ICON_SIZE_PX = 50;
  const GENERATOR_ICON_SIZE_PX = 50;
  const SHUNT_ICON_SIZE_PX = 50;
  const TRANSFORMER_ICON_SIZE_PX = 50;

  // Zoom-based multiplier (clamped) to scale icons & labels
  const zoomMult = useMemo(() => {
    const z = viewState?.zoom ?? 0;
    // Exponential scaling, clamp to avoid extremes
    const m = Math.pow(2, z);
    return Math.max(0.8, Math.min(2.2, m));
  }, [viewState?.zoom]);
  const busIconLayer = new (DeckLayers as any).IconLayer({
    id: 'buses-layer',
    data: filtered.buses,
    // Center the icon exactly at the bus coordinates and render original pixels (no masking)
    getIcon: () => ({ url: BUS_ICON_URL, width: 64, height: 64, anchorX: 32, anchorY: 32, mask: false }),
    getPosition: (d: Bus) => [d.x, d.y],
    getSize: () => BUS_ICON_SIZE_PX * zoomMult,
    sizeUnits: 'pixels',
    sizeMinPixels: 12,
    pickable: true,
    loadOptions: { image: { crossOrigin: 'anonymous' } },
    parameters: { depthTest: false },
    updateTriggers: { getSize: [zoomMult] },
  });

  const busNameLayer = new (DeckLayers as any).TextLayer({
    id: 'bus-names-layer',
    data: filtered.buses,
    getPosition: (d: Bus) => [d.x, d.y],
    getText: (b: Bus) => b.name || b.idtag,
    getSize: () => BUS_TEXT_SIZE_PX * zoomMult,
    sizeUnits: 'pixels',
    getPixelOffset: () => {
      const s = BUS_ICON_SIZE_PX * zoomMult;
      return [Math.round(s * 0.5) + 8, -Math.round(s * 0.5)];
    },
    getColor: [240, 240, 240, 255],
    background: true,
    backgroundColor: [17, 24, 39, 180],
    backgroundPadding: [4, 2],
    pickable: false,
    updateTriggers: { getSize: [zoomMult], getPixelOffset: [zoomMult] },
  });

  // Build map idtag -> position (bus_from/bus_to refer to idtag)
  const posByIdtag = useMemo(() => {
    const norm = (s?: string) => (s ?? '').trim().toLowerCase();
    const id = new Map<string, [number, number]>();
    for (const b of filtered.buses) {
      const p: [number, number] = [b.x, b.y];
      if ((b as any).idtag) id.set(norm((b as any).idtag), p);
    }
    return id;
  }, [filtered.buses]);

  const edgeData = useMemo(() => {
    const norm = (s?: string) => (s ?? '').trim().toLowerCase();
    return filtered.lines
      .map(l => {
        const kFrom = norm((l as any).bus_from_idtag);
        const kTo = norm((l as any).bus_to_idtag);
        const a = posByIdtag.get(kFrom);
        const b = posByIdtag.get(kTo);
        if (!a || !b) return null;
        return { source: a, target: b, fromKey: (l as any).bus_from_idtag, toKey: (l as any).bus_to_idtag, id: (l as any).id };
      })
      .filter(Boolean) as { source: [number, number]; target: [number, number]; fromKey: string; toKey: string; id: number }[];
  }, [filtered.lines, posByIdtag]);

  const transformerEdgeData = useMemo(() => {
    const norm = (s?: string) => (s ?? '').trim().toLowerCase();
    return filtered.transformers
      .map(t => {
        const kFrom = norm((t as any).bus_from_idtag);
        const kTo = norm((t as any).bus_to_idtag);
        const a = posByIdtag.get(kFrom);
        const b = posByIdtag.get(kTo);
        if (!a || !b) return null;
        return { source: a, target: b, fromKey: (t as any).bus_from_idtag, toKey: (t as any).bus_to_idtag, id: (t as any).id };
      })
      .filter(Boolean) as { source: [number, number]; target: [number, number]; fromKey: string; toKey: string; id: number }[];
  }, [filtered.transformers, posByIdtag]);

  const lineLayer = new LineLayer({
    id: 'lines-layer',
    data: edgeData,
    getSourcePosition: (d: any) => d.source,
    getTargetPosition: (d: any) => d.target,
    getColor: [255, 255, 255, 220],
    getWidth: 3,
    widthUnits: 'pixels',
    pickable: true,
    parameters: { depthTest: false },
  });

  // Generators: compute node positions with slight offset from their host bus and a connector line
  const genGeometry = useMemo(() => {
    // derive offset distance from current view heuristic span
    // reuse bounds-based span by re-computing quickly
    const xs = filtered.buses.map(b => b.x);
    const ys = filtered.buses.map(b => b.y);
    const minX = Math.min(...xs, 0);
    const maxX = Math.max(...xs, 1);
    const minY = Math.min(...ys, 0);
    const maxY = Math.max(...ys, 1);
    const span = Math.max(maxX - minX, maxY - minY) || 1;
    const dist = span * 0.02; // 2% of span
    const points: Array<{ position: [number, number]; name: string; idtag: string; bus_idtag: string; id: number }> = [];
    const edges: Array<{ source: [number, number]; target: [number, number]; fromKey: string; toKey: string }> = [];
    const norm = (s?: string) => (s ?? '').trim().toLowerCase();
    for (const g of filtered.generators) {
      const k = norm((g as any).bus_idtag);
      const busPos = posByIdtag.get(k);
      if (!busPos) continue;
      // stable angle from idtag hash
      const h = ((g.idtag || g.name || 'g').split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 12) * (Math.PI / 6);
      const gx = busPos[0] + Math.cos(h) * dist;
      const gy = busPos[1] + Math.sin(h) * dist;
      points.push({ position: [gx, gy], name: (g as any).name || g.idtag, idtag: g.idtag, bus_idtag: (g as any).bus_idtag, id: (g as any).id });
      edges.push({ source: [gx, gy], target: busPos, fromKey: g.idtag, toKey: (g as any).bus_idtag });
    }
    return { points, edges };
  }, [filtered.generators, filtered.buses, posByIdtag]);

  const generatorLayer = new (DeckLayers as any).IconLayer({
    id: 'generators-layer',
    data: genGeometry.points,
    getIcon: () => ({ url: GENERATOR_ICON_URL, width: 64, height: 64, anchorX: 32, anchorY: 32, mask: false }),
    getPosition: (d: any) => d.position,
    getSize: () => GENERATOR_ICON_SIZE_PX * zoomMult,
    sizeUnits: 'pixels',
    sizeMinPixels: 10,
    pickable: true,
    loadOptions: { image: { crossOrigin: 'anonymous' } },
    parameters: { depthTest: false },
    updateTriggers: { getSize: [zoomMult] },
  });

  const generatorConnectorLayer = new LineLayer({
    id: 'generator-connectors',
    data: genGeometry.edges,
    getSourcePosition: (d: any) => d.source,
    getTargetPosition: (d: any) => d.target,
    getColor: [255, 255, 255, 180],
    getWidth: 2,
    widthUnits: 'pixels',
    pickable: false,
    parameters: { depthTest: false },
  });

  // Shunts: similar to generators (node + connector to host bus)
  const shuntGeometry = useMemo(() => {
    const xs = filtered.buses.map(b => b.x);
    const ys = filtered.buses.map(b => b.y);
    const minX = Math.min(...xs, 0);
    const maxX = Math.max(...xs, 1);
    const minY = Math.min(...ys, 0);
    const maxY = Math.max(...ys, 1);
    const span = Math.max(maxX - minX, maxY - minY) || 1;
    const dist = span * 0.015; // slightly closer than generators
    const points: Array<{ position: [number, number]; name: string; idtag: string; bus_idtag: string; id: number }> = [];
    const edges: Array<{ source: [number, number]; target: [number, number]; fromKey: string; toKey: string }> = [];
    const norm = (s?: string) => (s ?? '').trim().toLowerCase();
    for (const s of filtered.shunts) {
      const k = norm((s as any).bus_idtag);
      const busPos = posByIdtag.get(k);
      if (!busPos) continue;
      // stable but different offset using hash + phase shift
      const base = ((s.idtag || s.name || 's').split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 12);
      const h = (base * (Math.PI / 6)) + Math.PI / 12; // 15 degrees offset from generators
      const sx = busPos[0] + Math.cos(h) * dist;
      const sy = busPos[1] + Math.sin(h) * dist;
      points.push({ position: [sx, sy], name: (s as any).name || s.idtag, idtag: s.idtag, bus_idtag: (s as any).bus_idtag, id: (s as any).id });
      edges.push({ source: [sx, sy], target: busPos, fromKey: s.idtag, toKey: (s as any).bus_idtag });
    }
    return { points, edges };
  }, [filtered.shunts, filtered.buses, posByIdtag]);

  const shuntLayer = new (DeckLayers as any).IconLayer({
    id: 'shunts-layer',
    data: shuntGeometry.points,
    getIcon: () => ({ url: SHUNT_ICON_URL, width: 64, height: 64, anchorX: 32, anchorY: 32, mask: false }),
    getPosition: (d: any) => d.position,
    getSize: () => SHUNT_ICON_SIZE_PX * zoomMult,
    sizeUnits: 'pixels',
    sizeMinPixels: 10,
    pickable: true,
    loadOptions: { image: { crossOrigin: 'anonymous' } },
    parameters: { depthTest: false },
    updateTriggers: { getSize: [zoomMult] },
  });

  const shuntConnectorLayer = new LineLayer({
    id: 'shunt-connectors',
    data: shuntGeometry.edges,
    getSourcePosition: (d: any) => d.source,
    getTargetPosition: (d: any) => d.target,
    getColor: [255, 255, 255, 180],
    getWidth: 2,
    widthUnits: 'pixels',
    pickable: false,
    parameters: { depthTest: false },
  });

  // Loads: node + connector to host bus; distinct offset and color
  const loadGeometry = useMemo(() => {
    const xs = filtered.buses.map(b => b.x);
    const ys = filtered.buses.map(b => b.y);
    const minX = Math.min(...xs, 0);
    const maxX = Math.max(...xs, 1);
    const minY = Math.min(...ys, 0);
    const maxY = Math.max(...ys, 1);
    const span = Math.max(maxX - minX, maxY - minY) || 1;
    const dist = span * 0.018; // between shunts and generators
    const points: Array<{ position: [number, number]; id?: number; name: string; idtag: string; bus_idtag: string; p_mw?: number; q_mvar?: number }> = [];
    const edges: Array<{ source: [number, number]; target: [number, number]; fromKey: string; toKey: string }> = [];
    const norm = (s?: string) => (s ?? '').trim().toLowerCase();
    for (const d of filtered.loads) {
      const k = norm((d as any).bus_idtag);
      const busPos = posByIdtag.get(k);
      if (!busPos) continue;
      // stable angle different from others: shift by 30 degrees
      const base = ((d.idtag || d.name || 'l').split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 12);
      const h = (base * (Math.PI / 6)) - Math.PI / 6; // -30 degrees shift
      const lx = busPos[0] + Math.cos(h) * dist;
      const ly = busPos[1] + Math.sin(h) * dist;
      points.push({ position: [lx, ly], id: (d as any).id, name: (d as any).name || d.idtag, idtag: d.idtag, bus_idtag: (d as any).bus_idtag, p_mw: (d as any).p_mw, q_mvar: (d as any).q_mvar });
      edges.push({ source: [lx, ly], target: busPos, fromKey: d.idtag, toKey: (d as any).bus_idtag });
    }
    return { points, edges };
  }, [filtered.loads, filtered.buses, posByIdtag]);

  const loadLayer = new (DeckLayers as any).IconLayer({
    id: 'loads-layer',
    data: loadGeometry.points,
    getIcon: () => ({ url: LOAD_ICON_URL, width: 64, height: 64, anchorX: 32, anchorY: 32, mask: false }),
    getPosition: (d: any) => d.position,
    getSize: () => LOAD_ICON_SIZE_PX * zoomMult,
    sizeUnits: 'pixels',
    sizeMinPixels: 10,
    pickable: true,
    loadOptions: { image: { crossOrigin: 'anonymous' } },
    parameters: { depthTest: false },
    updateTriggers: { getSize: [zoomMult] },
  });

  const loadConnectorLayer = new LineLayer({
    id: 'load-connectors',
    data: loadGeometry.edges,
    getSourcePosition: (d: any) => d.source,
    getTargetPosition: (d: any) => d.target,
    getColor: [255, 255, 255, 180],
    getWidth: 2,
    widthUnits: 'pixels',
    pickable: false,
    parameters: { depthTest: false },
  });

  const transformerLayer = new LineLayer({
    id: 'transformers-layer',
    data: transformerEdgeData,
    getSourcePosition: (d: any) => d.source,
    getTargetPosition: (d: any) => d.target,
    getColor: [255, 255, 255, 230],
    getWidth: 3,
    widthUnits: 'pixels',
    pickable: true,
    parameters: { depthTest: false },
  });

  // Transformer icons at the midpoint of each transformer line
  const transformerIconData = useMemo(() => {
    return transformerEdgeData.map(edge => {
      const midX = (edge.source[0] + edge.target[0]) / 2;
      const midY = (edge.source[1] + edge.target[1]) / 2;
      return { position: [midX, midY], id: edge.id, fromKey: edge.fromKey, toKey: edge.toKey };
    });
  }, [transformerEdgeData]);

  const transformerIconLayer = new (DeckLayers as any).IconLayer({
    id: 'transformer-icons-layer',
    data: transformerIconData,
    getIcon: () => ({ url: TRANSFORMER_ICON_URL, width: 64, height: 64, anchorX: 32, anchorY: 32, mask: false }),
    getPosition: (d: any) => d.position,
    getSize: () => TRANSFORMER_ICON_SIZE_PX * zoomMult,
    sizeUnits: 'pixels',
    sizeMinPixels: 12,
    pickable: true,
    loadOptions: { image: { crossOrigin: 'anonymous' } },
    parameters: { depthTest: false },
    updateTriggers: { getSize: [zoomMult] },
  });

  const matchStats = useMemo(() => {
    const totalLines = filtered.lines.length;
    const matchedLines = edgeData.length;
    const unmatchedLines = totalLines - matchedLines;
    const totalTx = filtered.transformers.length;
    const matchedTx = transformerEdgeData.length;
    const unmatchedTx = totalTx - matchedTx;
    const totalGen = filtered.generators.length;
    const matchedGen = genGeometry.points.length; // matched if it found a host bus
    const unmatchedGen = totalGen - matchedGen;
    const totalSh = filtered.shunts.length;
    const matchedSh = shuntGeometry.points.length;
    const unmatchedSh = totalSh - matchedSh;
    const totalLd = filtered.loads.length;
    const matchedLd = loadGeometry.points.length;
    const unmatchedLd = totalLd - matchedLd;
    return { totalLines, matchedLines, unmatchedLines, totalTx, matchedTx, unmatchedTx, totalGen, matchedGen, unmatchedGen, totalSh, matchedSh, unmatchedSh, totalLd, matchedLd, unmatchedLd };
  }, [filtered.lines, filtered.transformers, filtered.generators, filtered.shunts, filtered.loads, edgeData, transformerEdgeData, genGeometry.points.length, shuntGeometry.points.length, loadGeometry.points.length]);

  if (selectedGridId == null) {
    return (
      <div className="grid-viewer" style={{ color: '#cbd5e1', textAlign: 'center' }}>
        Upload a grid (File → Open) to visualize it.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid-viewer" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        <ElectricLoader message="Loading grid data..." />
      </div>
    );
  }

  return (
    <div className="grid-viewer" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <DeckGL
        views={new OrthographicView({ id: 'ortho' })}
        viewState={viewState as any}
        controller={true}
        onViewStateChange={(e: any) => setViewState(e.viewState)}
        getCursor={({isDragging, isHovering}: any) => (isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab')}
        onClick={(info: any) => {
          if (!info || !info.object || !info.layer) { setSelected(null); return; }
          const lid = info.layer.id as string;
          const obj = info.object;
          if (lid === 'buses-layer') {
            setSelected({ kind: 'bus', data: obj });
          } else if (lid === 'lines-layer') {
            setSelected({ kind: 'line', data: { id: obj.id, fromKey: obj.fromKey, toKey: obj.toKey } });
          } else if (lid === 'transformers-layer' || lid === 'transformer-icons-layer') {
            setSelected({ kind: 'transformer', data: { id: obj.id, fromKey: obj.fromKey, toKey: obj.toKey } });
          } else if (lid === 'generators-layer') {
            setSelected({ kind: 'generator', data: { id: obj.id, idtag: obj.idtag, bus_idtag: obj.bus_idtag, name: obj.name } });
          } else if (lid === 'loads-layer') {
            setSelected({ kind: 'load', data: { id: obj.id, idtag: obj.idtag, bus_idtag: obj.bus_idtag, name: obj.name, p_mw: obj.p_mw, q_mvar: obj.q_mvar } });
          } else if (lid === 'shunts-layer') {
            setSelected({ kind: 'shunt', data: { id: obj.id, idtag: obj.idtag, bus_idtag: obj.bus_idtag, name: obj.name } });
          } else {
            setSelected(null);
          }
        }}
  layers={[lineLayer, transformerLayer, transformerIconLayer, generatorConnectorLayer, generatorLayer, shuntConnectorLayer, shuntLayer, loadConnectorLayer, loadLayer, busIconLayer, busNameLayer]}
        getTooltip={({object, layer}: any) => {
          if (!object) return null;
          if (layer && layer.id === 'buses-layer') {
            const b = object as Bus;
            return { text: b.name || b.idtag };
          }
          if (layer && layer.id === 'lines-layer') {
            const o = object as any;
            return { text: `${o.fromKey} → ${o.toKey}` };
          }
          if (layer && layer.id === 'transformers-layer') {
            const o = object as any;
            return { text: `Tx: ${o.fromKey} → ${o.toKey}` };
          }
          if (layer && layer.id === 'transformer-icons-layer') {
            const o = object as any;
            return { text: `Tx: ${o.fromKey} → ${o.toKey}` };
          }
          if (layer && layer.id === 'generators-layer') {
            const o = object as any;
            return { text: `Gen: ${o.idtag} @ ${o.bus_idtag}` };
          }
          if (layer && layer.id === 'shunts-layer') {
            const o = object as any;
            return { text: `Shunt: ${o.idtag} @ ${o.bus_idtag}` };
          }
          if (layer && layer.id === 'loads-layer') {
            const o = object as any;
            const p = o.p_mw != null ? ` P=${o.p_mw}` : '';
            const q = o.q_mvar != null ? ` Q=${o.q_mvar}` : '';
            return { text: `Load: ${o.idtag} @ ${o.bus_idtag}${p}${q}` };
          }
          return null;
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          background: '#0b1220'
        }}
      />
      {selected && (
        <div style={{ 
          position: 'absolute', 
          top: 16, 
          right: 16, 
          zIndex: 1000,
          maxHeight: 'calc(100vh - 64px)'
        }}>
          <InfoPanel selected={selected} onClose={() => setSelected(null)} busDetails={busDetails} loadDetails={loadDetails} generatorDetails={generatorDetails} shuntDetails={shuntDetails} lineDetails={lineDetails} transformerDetails={transformerDetails} />
        </div>
      )}
    </div>
  );
};

export default GridViewer;
