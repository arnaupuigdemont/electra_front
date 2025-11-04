export interface GridModel {
  id: string;
  name: string;
  data: any[];
  [k: string]: any;
}

export interface UploadResult {
  message: string;
  grid_id: number;
  buses_saved?: number;
  lines_saved?: number;
  generators_saved?: number;
  loads_saved?: number;
  shunts_saved?: number;
  transformers2w_saved?: number;
}

export interface Bus {
  grid_id: number;
  idtag: string;
  name: string;
  x: number;
  y: number;
  longitude?: number;
  latitude?: number;
}

export interface Line {
  grid_id: number;
  idtag: string;
  name: string;
  bus_from_idtag: string;
  bus_to_idtag: string;
}

export interface Transformer2W {
  grid_id: number;
  idtag: string;
  name: string;
  bus_from_idtag: string;
  bus_to_idtag: string;
}

export interface Generator {
  grid_id: number;
  idtag: string;
  name: string;
  bus_idtag: string;
}

export interface Shunt {
  grid_id: number;
  idtag: string;
  name: string;
  bus_idtag: string;
}

export interface Load {
  grid_id: number;
  idtag: string;
  name: string;
  bus_idtag: string;
  // optional electrical data if provided by backend
  p_mw?: number;
  q_mvar?: number;
}

const BASE_URL = 'http://127.0.0.1:8000';

export async function uploadGridFile(file: File): Promise<UploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  const resp = await fetch(`${BASE_URL}/grid/files/upload`, {
    method: 'POST',
    body: formData
  });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(txt || `Upload failed (${resp.status})`);
  }
  return resp.json();
}

export async function listGridIds(): Promise<number[]> {
  const resp = await fetch(`${BASE_URL}/grid/ids`);
  if (!resp.ok) throw new Error(`Failed to fetch grid ids (${resp.status})`);
  return resp.json();
}

export async function listBuses(): Promise<Bus[]> {
  const resp = await fetch(`${BASE_URL}/bus/`);
  if (!resp.ok) throw new Error(`Failed to fetch buses (${resp.status})`);
  return resp.json();
}

export async function listLines(): Promise<Line[]> {
  const resp = await fetch(`${BASE_URL}/line/`);
  if (!resp.ok) throw new Error(`Failed to fetch lines (${resp.status})`);
  return resp.json();
}

export async function listTransformers2w(): Promise<Transformer2W[]> {
  const resp = await fetch(`${BASE_URL}/transformer2w/`);
  if (!resp.ok) throw new Error(`Failed to fetch transformers2w (${resp.status})`);
  return resp.json();
}

export async function listGenerators(): Promise<Generator[]> {
  const resp = await fetch(`${BASE_URL}/generator/`);
  if (!resp.ok) throw new Error(`Failed to fetch generators (${resp.status})`);
  return resp.json();
}

export async function listShunts(): Promise<Shunt[]> {
  const resp = await fetch(`${BASE_URL}/shunt/`);
  if (!resp.ok) throw new Error(`Failed to fetch shunts (${resp.status})`);
  return resp.json();
}

export async function listLoads(): Promise<Load[]> {
  const resp = await fetch(`${BASE_URL}/load/`);
  if (!resp.ok) throw new Error(`Failed to fetch loads (${resp.status})`);
  return resp.json();
}

export async function deleteGrid(grid_id: number): Promise<{ deleted: boolean; grid_id: number }> {
  const resp = await fetch(`${BASE_URL}/grid/${grid_id}`, {
    method: 'DELETE'
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || `Failed to delete grid (${resp.status})`);
  }
  return resp.json();
}