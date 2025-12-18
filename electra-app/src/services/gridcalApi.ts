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
  id: number;
  grid_id: number;
  idtag: string;
  name: string;
  x: number;
  y: number;
  longitude?: number;
  latitude?: number;
  is_slack?: boolean;
  active?: boolean;
}

export interface BusDetails extends Bus {
  code?: string;
  vnom?: number;
  vm0?: number;
  va0?: number;
  vmin?: number;
  vmax?: number;
  vm_cost?: number;
  angle_min?: number;
  angle_max?: number;
  angle_cost?: number;
  r_fault?: number;
  x_fault?: number;
  active?: boolean;
  is_dc?: boolean;
  graphic_type?: string;
  h?: number;
  w?: number;
  country?: string | null;
  area?: string | null;
  zone?: string | null;
  substation?: string | null;
  voltage_level?: string | null;
  bus_bar?: string | null;
  ph_a?: boolean;
  ph_b?: boolean;
  ph_c?: boolean;
  ph_n?: boolean;
  is_grounded?: boolean;
  active_prof?: any;
  vmin_prof?: any;
  vmax_prof?: any;
}

export interface Line {
  id?: number;
  grid_id: number;
  idtag: string;
  name: string;
  bus_from_idtag: string;
  bus_to_idtag: string;
  code?: string;
  rdfid?: string;
  action?: string;
  comment?: string;
  modelling_authority?: string;
  commissioned_date?: number;
  decommissioned_date?: number;
  active?: boolean;
  active_prof?: any;
  reducible?: boolean;
  rate?: number;
  rate_prof?: any;
  contingency_factor?: number;
  contingency_factor_prof?: any;
  protection_rating_factor?: number;
  protection_rating_factor_prof?: any;
  monitor_loading?: boolean;
  mttf?: number;
  mttr?: number;
  cost?: number;
  cost_prof?: any;
  build_status?: string;
  capex?: number;
  opex?: number;
  line_group?: string;
  color?: string;
  rms_model?: any;
  bus_from_pos?: number;
  bus_to_pos?: number;
  r?: number;
  x?: number;
  b?: number;
  r0?: number;
  x0?: number;
  b0?: number;
  r2?: number;
  x2?: number;
  b2?: number;
  ys?: any;
  ysh?: any;
  tolerance?: number;
  circuit_idx?: number;
  length?: number;
  temp_base?: number;
  temp_oper?: number;
  temp_oper_prof?: any;
  alpha?: number;
  r_fault?: number;
  x_fault?: number;
  fault_pos?: number;
  template?: string;
  locations?: any[];
  possible_tower_types?: any[];
  possible_underground_line_types?: any[];
  possible_sequence_line_types?: any[];
}

export interface Transformer2W {
  id?: number;
  grid_id: number;
  idtag: string;
  name?: string;
  code?: string;
  bus_from_idtag: string;
  bus_to_idtag: string;
  active?: boolean;
  r?: number;
  x?: number;
  g?: number;
  b?: number;
  hv?: number;
  lv?: number;
  sn?: number;
  rdfid?: string;
  action?: string;
  comment?: string;
  modelling_authority?: string;
  commissioned_date?: number;
  decommissioned_date?: number;
  active_prof?: any;
  reducible?: boolean;
  rate?: number;
  rate_prof?: any;
  contingency_factor?: number;
  contingency_factor_prof?: any;
  protection_rating_factor?: number;
  protection_rating_factor_prof?: any;
  monitor_loading?: boolean;
  mttf?: number;
  mttr?: number;
  cost?: number;
  cost_prof?: any;
  build_status?: string;
  capex?: number;
  opex?: number;
  tx_group?: string;
  color?: string;
  rms_model?: any;
  bus_from_pos?: number;
  bus_to_pos?: number;
  r0?: number;
  x0?: number;
  g0?: number;
  b0?: number;
  r2?: number;
  x2?: number;
  g2?: number;
  b2?: number;
  tolerance?: number;
  tap_changer?: any;
  tap_module?: number;
  tap_module_prof?: any;
  tap_module_max?: number;
  tap_module_min?: number;
  tap_module_control_mode?: string;
  tap_module_control_mode_prof?: any;
  vset?: number;
  vset_prof?: any;
  qset?: number;
  qset_prof?: any;
  regulation_bus?: string;
  tap_phase?: number;
  tap_phase_prof?: any;
  tap_phase_max?: number;
  tap_phase_min?: number;
  tap_phase_control_mode?: string;
  tap_phase_control_mode_prof?: any;
  pset?: number;
  pset_prof?: any;
  temp_base?: number;
  temp_oper?: number;
  temp_oper_prof?: any;
  alpha?: number;
  pcu?: number;
  pfe?: number;
  i0?: number;
  vsc?: number;
  conn?: string;
  conn_f?: string;
  conn_t?: string;
  vector_group_number?: number;
  template?: string;
}

export interface Generator {
  id?: number;
  grid_id: number;
  idtag: string;
  name: string;
  bus_idtag: string;
  code?: string;
  rdfid?: string;
  action?: string;
  comment?: string;
  modelling_authority?: string;
  commissioned_date?: number;
  decommissioned_date?: number;
  active?: boolean;
  active_prof?: any;
  mttf?: number;
  mttr?: number;
  capex?: number;
  opex?: number;
  build_status?: string;
  cost?: number;
  cost_prof?: any;
  facility?: string;
  technologies?: any[];
  scalable?: boolean;
  shift_key?: number;
  shift_key_prof?: any;
  longitude?: number;
  latitude?: number;
  use_kw?: boolean;
  conn?: string;
  rms_model?: any;
  bus_pos?: number;
  control_bus?: string;
  control_bus_prof?: any;
  p?: number;
  p_prof?: any;
  pmin?: number;
  pmin_prof?: any;
  pmax?: number;
  pmax_prof?: any;
  srap_enabled?: boolean;
  srap_enabled_prof?: any;
  is_controlled?: boolean;
  pf?: number;
  pf_prof?: any;
  vset?: number;
  vset_prof?: any;
  snom?: number;
  qmin?: number;
  qmin_prof?: any;
  qmax?: number;
  qmax_prof?: any;
  use_reactive_power_curve?: boolean;
  q_curve?: any;
  r1?: number;
  x1?: number;
  r0?: number;
  x0?: number;
  r2?: number;
  x2?: number;
  cost2?: number;
  cost2_prof?: any;
  cost0?: number;
  cost0_prof?: any;
  startupcost?: number;
  shutdowncost?: number;
  mintimeup?: number;
  mintimedown?: number;
  rampup?: number;
  rampdown?: number;
  enabled_dispatch?: boolean;
  emissions?: any[];
  fuels?: any[];
}

export interface Shunt {
  id?: number;
  grid_id: number;
  idtag: string;
  name: string;
  bus_idtag: string;
  code?: string;
  rdfid?: string;
  action?: string;
  comment?: string;
  modelling_authority?: string;
  commissioned_date?: number;
  decommissioned_date?: number;
  active?: boolean;
  active_prof?: any;
  mttf?: number;
  mttr?: number;
  capex?: number;
  opex?: number;
  build_status?: string;
  cost?: number;
  cost_prof?: any;
  facility?: string;
  technologies?: any[];
  scalable?: boolean;
  shift_key?: number;
  shift_key_prof?: any;
  longitude?: number;
  latitude?: number;
  use_kw?: boolean;
  conn?: string;
  rms_model?: any;
  bus_pos?: number;
  g?: number;
  g_prof?: any;
  g0?: number;
  g0_prof?: any;
  ga?: number;
  ga_prof?: any;
  gb?: number;
  gb_prof?: any;
  gc?: number;
  gc_prof?: any;
  b?: number;
  b_prof?: any;
  b0?: number;
  b0_prof?: any;
  ba?: number;
  ba_prof?: any;
  bb?: number;
  bb_prof?: any;
  bc?: number;
  bc_prof?: any;
  ysh?: any;
}

export interface Load {
  id?: number;
  grid_id: number;
  idtag: string;
  name: string;
  bus_idtag: string;
  code?: string;
  rdfid?: string;
  action?: string;
  comment?: string;
  modelling_authority?: string;
  commissioned_date?: number;
  decommissioned_date?: number;
  active?: boolean;
  active_prof?: any;
  mttf?: number;
  mttr?: number;
  capex?: number;
  opex?: number;
  build_status?: string;
  cost?: number;
  cost_prof?: any;
  facility?: string;
  technologies?: any[];
  scalable?: boolean;
  shift_key?: number;
  shift_key_prof?: any;
  longitude?: number;
  latitude?: number;
  use_kw?: boolean;
  conn?: string;
  rms_model?: any;
  bus_pos?: number;
  p?: number;
  p_prof?: any;
  pa?: number;
  pa_prof?: any;
  pb?: number;
  pb_prof?: any;
  pc?: number;
  pc_prof?: any;
  q?: number;
  q_prof?: any;
  qa?: number;
  qa_prof?: any;
  qb?: number;
  qb_prof?: any;
  qc?: number;
  qc_prof?: any;
  ir?: number;
  ir_prof?: any;
  ir1?: number;
  ir1_prof?: any;
  ir2?: number;
  ir2_prof?: any;
  ir3?: number;
  ir3_prof?: any;
  ii?: number;
  ii_prof?: any;
  ii1?: number;
  ii1_prof?: any;
  ii2?: number;
  ii2_prof?: any;
  ii3?: number;
  ii3_prof?: any;
  g?: number;
  g_prof?: any;
  g1?: number;
  g1_prof?: any;
  g2?: number;
  g2_prof?: any;
  g3?: number;
  g3_prof?: any;
  b?: number;
  b_prof?: any;
  b1?: number;
  b1_prof?: any;
  b2?: number;
  b2_prof?: any;
  b3?: number;
  b3_prof?: any;
  n_customers?: number;
  n_customers_prof?: any;
  // legacy aliases
  p_mw?: number;
  q_mvar?: number;
}

// Si estamos en producción (build), usa '/gridcal' (Nginx).
// Si estamos en desarrollo (npm run dev), usa localhost:8000.
const BASE_URL = import.meta.env.PROD 
  ? '/gridcal' 
  : 'http://localhost:8000';

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

export async function getBus(bus_id: number): Promise<BusDetails> {
  const resp = await fetch(`${BASE_URL}/bus/${bus_id}`);
  if (!resp.ok) throw new Error(`Failed to fetch bus (${resp.status})`);
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

export async function getGenerator(generator_id: number): Promise<Generator> {
  const resp = await fetch(`${BASE_URL}/generator/${generator_id}`);
  if (!resp.ok) throw new Error(`Failed to fetch generator (${resp.status})`);
  return resp.json();
}

export async function getLine(line_id: number): Promise<Line> {
  const resp = await fetch(`${BASE_URL}/line/${line_id}`);
  if (!resp.ok) throw new Error(`Failed to fetch line (${resp.status})`);
  return resp.json();
}

export async function getTransformer2W(transformer_id: number): Promise<Transformer2W> {
  const resp = await fetch(`${BASE_URL}/transformer2w/${transformer_id}`);
  if (!resp.ok) throw new Error(`Failed to fetch transformer (${resp.status})`);
  return resp.json();
}

export async function getShunt(shunt_id: number): Promise<Shunt> {
  const resp = await fetch(`${BASE_URL}/shunt/${shunt_id}`);
  if (!resp.ok) throw new Error(`Failed to fetch shunt (${resp.status})`);
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

export async function getLoad(load_id: number): Promise<Load> {
  const resp = await fetch(`${BASE_URL}/load/${load_id}`);
  if (!resp.ok) throw new Error(`Failed to fetch load (${resp.status})`);
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

export interface PowerFlowResults {
  grid_name: string;
  converged: boolean;
  error: number;
  bus_results: Array<{
    Vm: number;
    Va: number;
    P: number;
    Q: number;
  }>;
  branch_results: Array<{
    Pf: number;
    Qf: number;
    Pt: number;
    Qt: number;
    loading: number;
    Ploss: number;
    Qloss: number;
  }>;
}

export async function calculatePowerFlow(grid_id: number): Promise<PowerFlowResults> {
  const resp = await fetch(`${BASE_URL}/grid/${grid_id}/power-flow`);
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || `Failed to calculate power flow (${resp.status})`);
  }
  return resp.json();
}

// ===== STATUS UPDATE FUNCTIONS =====

export async function updateBusStatus(bus_id: number, active: boolean): Promise<BusDetails> {
  const resp = await fetch(`${BASE_URL}/bus/${bus_id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ active })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || `Failed to update bus status (${resp.status})`);
  }
  return resp.json();
}

export async function updateLineStatus(line_id: number, active: boolean): Promise<Line> {
  const resp = await fetch(`${BASE_URL}/line/${line_id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ active })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || `Failed to update line status (${resp.status})`);
  }
  return resp.json();
}

export async function updateGeneratorStatus(generator_id: number, active: boolean): Promise<Generator> {
  const resp = await fetch(`${BASE_URL}/generator/${generator_id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ active })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || `Failed to update generator status (${resp.status})`);
  }
  return resp.json();
}

export async function updateLoadStatus(load_id: number, active: boolean): Promise<Load> {
  const resp = await fetch(`${BASE_URL}/load/${load_id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ active })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || `Failed to update load status (${resp.status})`);
  }
  return resp.json();
}

export async function updateShuntStatus(shunt_id: number, active: boolean): Promise<Shunt> {
  const resp = await fetch(`${BASE_URL}/shunt/${shunt_id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ active })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || `Failed to update shunt status (${resp.status})`);
  }
  return resp.json();
}

export async function updateTransformerStatus(transformer_id: number, active: boolean): Promise<Transformer2W> {
  const resp = await fetch(`${BASE_URL}/transformer2w/${transformer_id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ active })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || `Failed to update transformer status (${resp.status})`);
  }
  return resp.json();
}
