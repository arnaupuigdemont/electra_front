import React from 'react';
import type { BusDetails, Load, Generator, Shunt, Line, Transformer2W } from '../services/gridcalApi';
import '../styles/components/InfoPanel.css';

export type SelectedItem =
  | { kind: 'bus'; data: any }
  | { kind: 'line'; data: { id?: number; fromKey: string; toKey: string } }
  | { kind: 'transformer'; data: { id?: number; fromKey: string; toKey: string } }
  | { kind: 'generator'; data: { id?: number; idtag: string; bus_idtag: string; name?: string } }
  | { kind: 'load'; data: { id?: number; idtag: string; bus_idtag: string; name?: string; p_mw?: number; q_mvar?: number } }
  | { kind: 'shunt'; data: { id?: number; idtag: string; bus_idtag: string; name?: string } };

interface InfoPanelProps {
  selected: SelectedItem | null;
  onClose: () => void;
  busDetails?: BusDetails | null;
  loadDetails?: Load | null;
  generatorDetails?: Generator | null;
  shuntDetails?: Shunt | null;
  lineDetails?: Line | null;
  transformerDetails?: Transformer2W | null;
}

const rowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', marginBottom: 6 };

const InfoPanel: React.FC<InfoPanelProps> = ({ selected, onClose, busDetails, loadDetails, generatorDetails, shuntDetails, lineDetails, transformerDetails }) => {
  if (!selected) return null;

  const Box: React.CSSProperties = {
    width: 320,
    minWidth: 320,
    maxWidth: 360,
    background: '#0b1220',
    color: '#e5e7eb',
    border: '1px solid #334155',
    borderRadius: 0,
    padding: 16,
    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
  };

  const Title: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginBottom: 12 };
  const Muted: React.CSSProperties = { color: '#94a3b8' };
  const Divider: React.CSSProperties = { height: 1, background: '#23314e', margin: '10px 0' };

  const renderContent = () => {
    switch (selected.kind) {
      case 'bus': {
        const b = selected.data as any;
        return (
          <>
            <div style={rowStyle}><span>Name</span><span style={Muted as any}>{b.name || b.idtag}</span></div>
            <div style={rowStyle}><span>IDTag</span><span style={Muted as any} title={b.idtag}>{b.idtag.slice(0, 12)}...</span></div>
            {busDetails?.code && <div style={rowStyle}><span>Code</span><span style={Muted as any}>{busDetails.code}</span></div>}
            
            <div style={Divider} />
            <div style={rowStyle}><span>Coords</span><span style={Muted as any}>({b.x.toFixed(2)}, {b.y.toFixed(2)})</span></div>
            {busDetails?.longitude != null && <div style={rowStyle}><span>Lon/Lat</span><span style={Muted as any}>{busDetails.longitude} / {busDetails.latitude}</span></div>}
            
            {busDetails && (
              <>
                <div style={Divider} />
                <div style={rowStyle}><span>Slack</span><span style={Muted as any}>{String(busDetails.is_slack)}</span></div>
                {busDetails.active != null && <div style={rowStyle}><span>Active</span><span style={Muted as any}>{String(busDetails.active)}</span></div>}
                {busDetails.is_dc != null && <div style={rowStyle}><span>DC</span><span style={Muted as any}>{String(busDetails.is_dc)}</span></div>}
                
                <div style={Divider} />
                {busDetails.vnom != null && <div style={rowStyle}><span>Vnom</span><span style={Muted as any}>{busDetails.vnom}</span></div>}
                {busDetails.vm0 != null && <div style={rowStyle}><span>Vm0</span><span style={Muted as any}>{busDetails.vm0}</span></div>}
                {busDetails.va0 != null && <div style={rowStyle}><span>Va0</span><span style={Muted as any}>{busDetails.va0}</span></div>}
                {busDetails.vmin != null && <div style={rowStyle}><span>Vmin/Vmax</span><span style={Muted as any}>{busDetails.vmin} / {busDetails.vmax}</span></div>}
                {busDetails.vm_cost != null && <div style={rowStyle}><span>Vm cost</span><span style={Muted as any}>{busDetails.vm_cost}</span></div>}
                
                {(busDetails.angle_min != null || busDetails.angle_max != null) && (
                  <div style={rowStyle}><span>Angle range</span><span style={Muted as any}>{busDetails.angle_min ?? '—'} .. {busDetails.angle_max ?? '—'}</span></div>
                )}
                {busDetails.angle_cost != null && <div style={rowStyle}><span>Angle cost</span><span style={Muted as any}>{busDetails.angle_cost}</span></div>}
                
                {(busDetails.r_fault != null || busDetails.x_fault != null) && (
                  <>
                    <div style={Divider} />
                    {busDetails.r_fault != null && <div style={rowStyle}><span>R fault</span><span style={Muted as any}>{busDetails.r_fault}</span></div>}
                    {busDetails.x_fault != null && <div style={rowStyle}><span>X fault</span><span style={Muted as any}>{busDetails.x_fault}</span></div>}
                  </>
                )}
                
                {(busDetails.country || busDetails.area || busDetails.zone || busDetails.substation || busDetails.voltage_level || busDetails.bus_bar) && (
                  <>
                    <div style={Divider} />
                    {busDetails.country && <div style={rowStyle}><span>Country</span><span style={Muted as any}>{busDetails.country}</span></div>}
                    {busDetails.area && <div style={rowStyle}><span>Area</span><span style={Muted as any}>{busDetails.area}</span></div>}
                    {busDetails.zone && <div style={rowStyle}><span>Zone</span><span style={Muted as any}>{busDetails.zone}</span></div>}
                    {busDetails.substation && <div style={rowStyle}><span>Substation</span><span style={Muted as any}>{busDetails.substation}</span></div>}
                    {busDetails.voltage_level && <div style={rowStyle}><span>Voltage level</span><span style={Muted as any}>{busDetails.voltage_level}</span></div>}
                    {busDetails.bus_bar && <div style={rowStyle}><span>Bus bar</span><span style={Muted as any}>{busDetails.bus_bar}</span></div>}
                  </>
                )}
                
                {(busDetails.ph_a != null || busDetails.ph_b != null || busDetails.ph_c != null || busDetails.ph_n != null || busDetails.is_grounded != null) && (
                  <>
                    <div style={Divider} />
                    {busDetails.ph_a != null && <div style={rowStyle}><span>Phase A</span><span style={Muted as any}>{String(busDetails.ph_a)}</span></div>}
                    {busDetails.ph_b != null && <div style={rowStyle}><span>Phase B</span><span style={Muted as any}>{String(busDetails.ph_b)}</span></div>}
                    {busDetails.ph_c != null && <div style={rowStyle}><span>Phase C</span><span style={Muted as any}>{String(busDetails.ph_c)}</span></div>}
                    {busDetails.ph_n != null && <div style={rowStyle}><span>Phase N</span><span style={Muted as any}>{String(busDetails.ph_n)}</span></div>}
                    {busDetails.is_grounded != null && <div style={rowStyle}><span>Grounded</span><span style={Muted as any}>{String(busDetails.is_grounded)}</span></div>}
                  </>
                )}
                
                {busDetails.graphic_type && <div style={rowStyle}><span>Graphic</span><span style={Muted as any}>{busDetails.graphic_type}</span></div>}
                {(busDetails.h != null || busDetails.w != null) && <div style={rowStyle}><span>H×W</span><span style={Muted as any}>{busDetails.h} × {busDetails.w}</span></div>}
                
                {(busDetails.active_prof || busDetails.vmin_prof || busDetails.vmax_prof) && (
                  <>
                    <div style={Divider} />
                    {busDetails.active_prof && <div style={rowStyle}><span>Active prof</span><span style={Muted as any}>Present</span></div>}
                    {busDetails.vmin_prof && <div style={rowStyle}><span>Vmin prof</span><span style={Muted as any}>Present</span></div>}
                    {busDetails.vmax_prof && <div style={rowStyle}><span>Vmax prof</span><span style={Muted as any}>Present</span></div>}
                  </>
                )}
              </>
            )}
          </>
        );
      }
      case 'line': {
        const d = selected.data as { id?: number; fromKey: string; toKey: string };
        const fmt = (val: any) => {
          if (val == null) return '-';
          if (typeof val === 'object') return 'Complex Object';
          if (typeof val === 'number') return val.toFixed(6);
          return val;
        };
        const fmtBool = (val: any) => val != null ? (val ? 'Yes' : 'No') : '-';

        return (
          <>
            <div style={rowStyle}><span>From Bus</span><span style={Muted as any}>{d.fromKey || '-'}</span></div>
            <div style={rowStyle}><span>To Bus</span><span style={Muted as any}>{d.toKey || '-'}</span></div>
            {d.id != null && <div style={rowStyle}><span>ID</span><span style={Muted as any}>{d.id}</span></div>}

            {lineDetails && (
              <>
                <div style={rowStyle}><span>IDTag</span><span style={Muted as any}>{fmt(lineDetails.idtag)}</span></div>
                <div style={rowStyle}><span>Name</span><span style={Muted as any}>{fmt(lineDetails.name)}</span></div>
                <div style={rowStyle}><span>Code</span><span style={Muted as any}>{fmt(lineDetails.code)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Status</div>
                <div style={rowStyle}><span>Active</span><span style={Muted as any}>{fmtBool(lineDetails.active)}</span></div>
                <div style={rowStyle}><span>Monitor Loading</span><span style={Muted as any}>{fmtBool(lineDetails.monitor_loading)}</span></div>
                <div style={rowStyle}><span>Contingency Factor</span><span style={Muted as any}>{fmt(lineDetails.contingency_factor)}</span></div>
                <div style={rowStyle}><span>Protection Rating Factor</span><span style={Muted as any}>{fmt(lineDetails.protection_rating_factor)}</span></div>
                <div style={rowStyle}><span>Build Status</span><span style={Muted as any}>{fmt(lineDetails.build_status)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Impedances (Positive Sequence)</div>
                <div style={rowStyle}><span>R (p.u.)</span><span style={Muted as any}>{fmt(lineDetails.r)}</span></div>
                <div style={rowStyle}><span>X (p.u.)</span><span style={Muted as any}>{fmt(lineDetails.x)}</span></div>
                <div style={rowStyle}><span>B (p.u.)</span><span style={Muted as any}>{fmt(lineDetails.b)}</span></div>
                <div style={rowStyle}><span>Length (km)</span><span style={Muted as any}>{fmt(lineDetails.length)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Sequence Impedances</div>
                <div style={rowStyle}><span>R0 (p.u.)</span><span style={Muted as any}>{fmt(lineDetails.r0)}</span></div>
                <div style={rowStyle}><span>X0 (p.u.)</span><span style={Muted as any}>{fmt(lineDetails.x0)}</span></div>
                <div style={rowStyle}><span>B0 (p.u.)</span><span style={Muted as any}>{fmt(lineDetails.b0)}</span></div>
                <div style={rowStyle}><span>R2 (p.u.)</span><span style={Muted as any}>{fmt(lineDetails.r2)}</span></div>
                <div style={rowStyle}><span>X2 (p.u.)</span><span style={Muted as any}>{fmt(lineDetails.x2)}</span></div>
                <div style={rowStyle}><span>B2 (p.u.)</span><span style={Muted as any}>{fmt(lineDetails.b2)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Ratings</div>
                <div style={rowStyle}><span>Rate (MVA)</span><span style={Muted as any}>{fmt(lineDetails.rate)}</span></div>
                <div style={rowStyle}><span>Contingency Factor Prof</span><span style={Muted as any}>{lineDetails.contingency_factor_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Rate Prof</span><span style={Muted as any}>{lineDetails.rate_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Protection Rating Factor Prof</span><span style={Muted as any}>{lineDetails.protection_rating_factor_prof ? 'Present' : '-'}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Temperature Parameters</div>
                <div style={rowStyle}><span>Temp Base (°C)</span><span style={Muted as any}>{fmt(lineDetails.temp_base)}</span></div>
                <div style={rowStyle}><span>Temp Oper (°C)</span><span style={Muted as any}>{fmt(lineDetails.temp_oper)}</span></div>
                <div style={rowStyle}><span>Temp Oper Prof</span><span style={Muted as any}>{lineDetails.temp_oper_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Alpha</span><span style={Muted as any}>{fmt(lineDetails.alpha)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Fault Parameters</div>
                <div style={rowStyle}><span>R Fault (p.u.)</span><span style={Muted as any}>{fmt(lineDetails.r_fault)}</span></div>
                <div style={rowStyle}><span>X Fault (p.u.)</span><span style={Muted as any}>{fmt(lineDetails.x_fault)}</span></div>
                <div style={rowStyle}><span>Fault Position</span><span style={Muted as any}>{fmt(lineDetails.fault_pos)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Economic Data</div>
                <div style={rowStyle}><span>Cost</span><span style={Muted as any}>{fmt(lineDetails.cost)}</span></div>
                <div style={rowStyle}><span>Cost Prof</span><span style={Muted as any}>{lineDetails.cost_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>CAPEX</span><span style={Muted as any}>{fmt(lineDetails.capex)}</span></div>
                <div style={rowStyle}><span>OPEX</span><span style={Muted as any}>{fmt(lineDetails.opex)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Reliability</div>
                <div style={rowStyle}><span>MTTF (h)</span><span style={Muted as any}>{fmt(lineDetails.mttf)}</span></div>
                <div style={rowStyle}><span>MTTR (h)</span><span style={Muted as any}>{fmt(lineDetails.mttr)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Configuration</div>
                <div style={rowStyle}><span>RMS Model</span><span style={Muted as any}>{fmt(lineDetails.rms_model)}</span></div>
                <div style={rowStyle}><span>Tolerance</span><span style={Muted as any}>{fmt(lineDetails.tolerance)}</span></div>
                <div style={rowStyle}><span>Circuit Index</span><span style={Muted as any}>{fmt(lineDetails.circuit_idx)}</span></div>
                <div style={rowStyle}><span>Reducible</span><span style={Muted as any}>{fmtBool(lineDetails.reducible)}</span></div>
                <div style={rowStyle}><span>Line Group</span><span style={Muted as any}>{fmt(lineDetails.line_group)}</span></div>
                <div style={rowStyle}><span>Color</span><span style={Muted as any}>{fmt(lineDetails.color)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Profiles</div>
                <div style={rowStyle}><span>Active Prof</span><span style={Muted as any}>{lineDetails.active_prof ? 'Present' : '-'}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Additional Info</div>
                <div style={rowStyle}><span>RDF ID</span><span style={Muted as any}>{fmt(lineDetails.rdfid)}</span></div>
                <div style={rowStyle}><span>Action</span><span style={Muted as any}>{fmt(lineDetails.action)}</span></div>
                <div style={rowStyle}><span>Comment</span><span style={Muted as any}>{fmt(lineDetails.comment)}</span></div>
                <div style={rowStyle}><span>Modelling Authority</span><span style={Muted as any}>{fmt(lineDetails.modelling_authority)}</span></div>
                <div style={rowStyle}><span>Template</span><span style={Muted as any}>{fmt(lineDetails.template)}</span></div>
              </>
            )}
          </>
        );
      }
      case 'transformer': {
        const d = selected.data as { id?: number; fromKey: string; toKey: string };
        const fmt = (val: any) => {
          if (val == null) return '-';
          if (typeof val === 'object') return 'Complex Object';
          if (typeof val === 'number') return val.toFixed(6);
          return val;
        };
        const fmtBool = (val: any) => val != null ? (val ? 'Yes' : 'No') : '-';

        return (
          <>
            <div style={rowStyle}><span>From Bus</span><span style={Muted as any}>{d.fromKey || '-'}</span></div>
            <div style={rowStyle}><span>To Bus</span><span style={Muted as any}>{d.toKey || '-'}</span></div>
            {d.id != null && <div style={rowStyle}><span>ID</span><span style={Muted as any}>{d.id}</span></div>}

            {transformerDetails && (
              <>
                <div style={rowStyle}><span>IDTag</span><span style={Muted as any}>{fmt(transformerDetails.idtag)}</span></div>
                <div style={rowStyle}><span>Name</span><span style={Muted as any}>{fmt(transformerDetails.name)}</span></div>
                <div style={rowStyle}><span>Code</span><span style={Muted as any}>{fmt(transformerDetails.code)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Status</div>
                <div style={rowStyle}><span>Active</span><span style={Muted as any}>{fmtBool(transformerDetails.active)}</span></div>
                <div style={rowStyle}><span>Monitor Loading</span><span style={Muted as any}>{fmtBool(transformerDetails.monitor_loading)}</span></div>
                <div style={rowStyle}><span>Reducible</span><span style={Muted as any}>{fmtBool(transformerDetails.reducible)}</span></div>
                <div style={rowStyle}><span>Build Status</span><span style={Muted as any}>{fmt(transformerDetails.build_status)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Impedances (Positive Sequence)</div>
                <div style={rowStyle}><span>R (p.u.)</span><span style={Muted as any}>{fmt(transformerDetails.r)}</span></div>
                <div style={rowStyle}><span>X (p.u.)</span><span style={Muted as any}>{fmt(transformerDetails.x)}</span></div>
                <div style={rowStyle}><span>G (p.u.)</span><span style={Muted as any}>{fmt(transformerDetails.g)}</span></div>
                <div style={rowStyle}><span>B (p.u.)</span><span style={Muted as any}>{fmt(transformerDetails.b)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Sequence Impedances</div>
                <div style={rowStyle}><span>R0 (p.u.)</span><span style={Muted as any}>{fmt(transformerDetails.r0)}</span></div>
                <div style={rowStyle}><span>X0 (p.u.)</span><span style={Muted as any}>{fmt(transformerDetails.x0)}</span></div>
                <div style={rowStyle}><span>G0 (p.u.)</span><span style={Muted as any}>{fmt(transformerDetails.g0)}</span></div>
                <div style={rowStyle}><span>B0 (p.u.)</span><span style={Muted as any}>{fmt(transformerDetails.b0)}</span></div>
                <div style={rowStyle}><span>R2 (p.u.)</span><span style={Muted as any}>{fmt(transformerDetails.r2)}</span></div>
                <div style={rowStyle}><span>X2 (p.u.)</span><span style={Muted as any}>{fmt(transformerDetails.x2)}</span></div>
                <div style={rowStyle}><span>G2 (p.u.)</span><span style={Muted as any}>{fmt(transformerDetails.g2)}</span></div>
                <div style={rowStyle}><span>B2 (p.u.)</span><span style={Muted as any}>{fmt(transformerDetails.b2)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Ratings & Voltages</div>
                <div style={rowStyle}><span>HV (kV)</span><span style={Muted as any}>{fmt(transformerDetails.hv)}</span></div>
                <div style={rowStyle}><span>LV (kV)</span><span style={Muted as any}>{fmt(transformerDetails.lv)}</span></div>
                <div style={rowStyle}><span>Sn (MVA)</span><span style={Muted as any}>{fmt(transformerDetails.sn)}</span></div>
                <div style={rowStyle}><span>Rate (MVA)</span><span style={Muted as any}>{fmt(transformerDetails.rate)}</span></div>
                <div style={rowStyle}><span>Rate Prof</span><span style={Muted as any}>{transformerDetails.rate_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Contingency Factor</span><span style={Muted as any}>{fmt(transformerDetails.contingency_factor)}</span></div>
                <div style={rowStyle}><span>Protection Rating Factor</span><span style={Muted as any}>{fmt(transformerDetails.protection_rating_factor)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Tap Module Control</div>
                <div style={rowStyle}><span>Tap Module</span><span style={Muted as any}>{fmt(transformerDetails.tap_module)}</span></div>
                <div style={rowStyle}><span>Tap Module Prof</span><span style={Muted as any}>{transformerDetails.tap_module_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Tap Module Max</span><span style={Muted as any}>{fmt(transformerDetails.tap_module_max)}</span></div>
                <div style={rowStyle}><span>Tap Module Min</span><span style={Muted as any}>{fmt(transformerDetails.tap_module_min)}</span></div>
                <div style={rowStyle}><span>Control Mode</span><span style={Muted as any}>{fmt(transformerDetails.tap_module_control_mode)}</span></div>
                <div style={rowStyle}><span>Control Mode Prof</span><span style={Muted as any}>{transformerDetails.tap_module_control_mode_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Vset</span><span style={Muted as any}>{fmt(transformerDetails.vset)}</span></div>
                <div style={rowStyle}><span>Vset Prof</span><span style={Muted as any}>{transformerDetails.vset_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Qset</span><span style={Muted as any}>{fmt(transformerDetails.qset)}</span></div>
                <div style={rowStyle}><span>Qset Prof</span><span style={Muted as any}>{transformerDetails.qset_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Regulation Bus</span><span style={Muted as any}>{fmt(transformerDetails.regulation_bus)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Tap Phase Control</div>
                <div style={rowStyle}><span>Tap Phase</span><span style={Muted as any}>{fmt(transformerDetails.tap_phase)}</span></div>
                <div style={rowStyle}><span>Tap Phase Prof</span><span style={Muted as any}>{transformerDetails.tap_phase_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Tap Phase Max</span><span style={Muted as any}>{fmt(transformerDetails.tap_phase_max)}</span></div>
                <div style={rowStyle}><span>Tap Phase Min</span><span style={Muted as any}>{fmt(transformerDetails.tap_phase_min)}</span></div>
                <div style={rowStyle}><span>Control Mode</span><span style={Muted as any}>{fmt(transformerDetails.tap_phase_control_mode)}</span></div>
                <div style={rowStyle}><span>Control Mode Prof</span><span style={Muted as any}>{transformerDetails.tap_phase_control_mode_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Pset</span><span style={Muted as any}>{fmt(transformerDetails.pset)}</span></div>
                <div style={rowStyle}><span>Pset Prof</span><span style={Muted as any}>{transformerDetails.pset_prof ? 'Present' : '-'}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Temperature & Losses</div>
                <div style={rowStyle}><span>Temp Base (°C)</span><span style={Muted as any}>{fmt(transformerDetails.temp_base)}</span></div>
                <div style={rowStyle}><span>Temp Oper (°C)</span><span style={Muted as any}>{fmt(transformerDetails.temp_oper)}</span></div>
                <div style={rowStyle}><span>Temp Oper Prof</span><span style={Muted as any}>{transformerDetails.temp_oper_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Alpha</span><span style={Muted as any}>{fmt(transformerDetails.alpha)}</span></div>
                <div style={rowStyle}><span>Pcu (MW)</span><span style={Muted as any}>{fmt(transformerDetails.pcu)}</span></div>
                <div style={rowStyle}><span>Pfe (MW)</span><span style={Muted as any}>{fmt(transformerDetails.pfe)}</span></div>
                <div style={rowStyle}><span>I0 (%)</span><span style={Muted as any}>{fmt(transformerDetails.i0)}</span></div>
                <div style={rowStyle}><span>Vsc (%)</span><span style={Muted as any}>{fmt(transformerDetails.vsc)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Connection Configuration</div>
                <div style={rowStyle}><span>Connection</span><span style={Muted as any}>{fmt(transformerDetails.conn)}</span></div>
                <div style={rowStyle}><span>Connection From</span><span style={Muted as any}>{fmt(transformerDetails.conn_f)}</span></div>
                <div style={rowStyle}><span>Connection To</span><span style={Muted as any}>{fmt(transformerDetails.conn_t)}</span></div>
                <div style={rowStyle}><span>Vector Group Number</span><span style={Muted as any}>{fmt(transformerDetails.vector_group_number)}</span></div>
                <div style={rowStyle}><span>Tolerance</span><span style={Muted as any}>{fmt(transformerDetails.tolerance)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Economic Data</div>
                <div style={rowStyle}><span>Cost</span><span style={Muted as any}>{fmt(transformerDetails.cost)}</span></div>
                <div style={rowStyle}><span>Cost Prof</span><span style={Muted as any}>{transformerDetails.cost_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>CAPEX</span><span style={Muted as any}>{fmt(transformerDetails.capex)}</span></div>
                <div style={rowStyle}><span>OPEX</span><span style={Muted as any}>{fmt(transformerDetails.opex)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Reliability</div>
                <div style={rowStyle}><span>MTTF (h)</span><span style={Muted as any}>{fmt(transformerDetails.mttf)}</span></div>
                <div style={rowStyle}><span>MTTR (h)</span><span style={Muted as any}>{fmt(transformerDetails.mttr)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Configuration</div>
                <div style={rowStyle}><span>Group</span><span style={Muted as any}>{fmt(transformerDetails.tx_group)}</span></div>
                <div style={rowStyle}><span>Color</span><span style={Muted as any}>{fmt(transformerDetails.color)}</span></div>
                <div style={rowStyle}><span>Bus From Pos</span><span style={Muted as any}>{fmt(transformerDetails.bus_from_pos)}</span></div>
                <div style={rowStyle}><span>Bus To Pos</span><span style={Muted as any}>{fmt(transformerDetails.bus_to_pos)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Profiles</div>
                <div style={rowStyle}><span>Active Prof</span><span style={Muted as any}>{transformerDetails.active_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Contingency Factor Prof</span><span style={Muted as any}>{transformerDetails.contingency_factor_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Protection Rating Factor Prof</span><span style={Muted as any}>{transformerDetails.protection_rating_factor_prof ? 'Present' : '-'}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Additional Info</div>
                <div style={rowStyle}><span>RDF ID</span><span style={Muted as any}>{fmt(transformerDetails.rdfid)}</span></div>
                <div style={rowStyle}><span>Action</span><span style={Muted as any}>{fmt(transformerDetails.action)}</span></div>
                <div style={rowStyle}><span>Comment</span><span style={Muted as any}>{fmt(transformerDetails.comment)}</span></div>
                <div style={rowStyle}><span>Modelling Authority</span><span style={Muted as any}>{fmt(transformerDetails.modelling_authority)}</span></div>
                <div style={rowStyle}><span>Template</span><span style={Muted as any}>{fmt(transformerDetails.template)}</span></div>
              </>
            )}
          </>
        );
      }
      case 'generator': {
        const g = selected.data as any;
        const fmt = (val: any) => {
          if (val == null) return '-';
          if (typeof val === 'object') return 'Complex Object';
          if (typeof val === 'number') return val.toFixed(6);
          return val;
        };
        const fmtBool = (val: any) => val != null ? (val ? 'Yes' : 'No') : '-';

        return (
          <>
            <div style={rowStyle}><span>Name</span><span style={Muted as any}>{g.name || g.idtag}</span></div>
            <div style={rowStyle}><span>Bus</span><span style={Muted as any}>{g.bus_idtag}</span></div>
            
            {generatorDetails && (
              <>
                <div style={rowStyle}><span>ID</span><span style={Muted as any}>{fmt(generatorDetails.id)}</span></div>
                <div style={rowStyle}><span>Code</span><span style={Muted as any}>{fmt(generatorDetails.code)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Status</div>
                <div style={rowStyle}><span>Active</span><span style={Muted as any}>{fmtBool(generatorDetails.active)}</span></div>
                <div style={rowStyle}><span>Is Controlled</span><span style={Muted as any}>{fmtBool(generatorDetails.is_controlled)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Power Limits</div>
                <div style={rowStyle}><span>P (MW)</span><span style={Muted as any}>{fmt(generatorDetails.p)}</span></div>
                <div style={rowStyle}><span>Power Factor</span><span style={Muted as any}>{fmt(generatorDetails.pf)}</span></div>
                <div style={rowStyle}><span>Vset (pu)</span><span style={Muted as any}>{fmt(generatorDetails.vset)}</span></div>
                <div style={rowStyle}><span>Snom (MVA)</span><span style={Muted as any}>{fmt(generatorDetails.snom)}</span></div>
                <div style={rowStyle}><span>Qmin (MVAr)</span><span style={Muted as any}>{fmt(generatorDetails.qmin)}</span></div>
                <div style={rowStyle}><span>Qmax (MVAr)</span><span style={Muted as any}>{fmt(generatorDetails.qmax)}</span></div>
                <div style={rowStyle}><span>Pmin (MW)</span><span style={Muted as any}>{fmt(generatorDetails.pmin)}</span></div>
                <div style={rowStyle}><span>Pmax (MW)</span><span style={Muted as any}>{fmt(generatorDetails.pmax)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Control</div>
                <div style={rowStyle}><span>Control Bus</span><span style={Muted as any}>{fmt(generatorDetails.control_bus)}</span></div>
                <div style={rowStyle}><span>SRAP Enabled</span><span style={Muted as any}>{fmtBool(generatorDetails.srap_enabled)}</span></div>
                <div style={rowStyle}><span>Use Q Curve</span><span style={Muted as any}>{fmtBool(generatorDetails.use_reactive_power_curve)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Impedances</div>
                <div style={rowStyle}><span>R0 (pu)</span><span style={Muted as any}>{fmt(generatorDetails.r0)}</span></div>
                <div style={rowStyle}><span>X0 (pu)</span><span style={Muted as any}>{fmt(generatorDetails.x0)}</span></div>
                <div style={rowStyle}><span>R1 (pu)</span><span style={Muted as any}>{fmt(generatorDetails.r1)}</span></div>
                <div style={rowStyle}><span>X1 (pu)</span><span style={Muted as any}>{fmt(generatorDetails.x1)}</span></div>
                <div style={rowStyle}><span>R2 (pu)</span><span style={Muted as any}>{fmt(generatorDetails.r2)}</span></div>
                <div style={rowStyle}><span>X2 (pu)</span><span style={Muted as any}>{fmt(generatorDetails.x2)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Ramp Rates</div>
                <div style={rowStyle}><span>Ramp Up (MW/h)</span><span style={Muted as any}>{fmt(generatorDetails.rampup)}</span></div>
                <div style={rowStyle}><span>Ramp Down (MW/h)</span><span style={Muted as any}>{fmt(generatorDetails.rampdown)}</span></div>
                <div style={rowStyle}><span>Min Time Up (h)</span><span style={Muted as any}>{fmt(generatorDetails.mintimeup)}</span></div>
                <div style={rowStyle}><span>Min Time Down (h)</span><span style={Muted as any}>{fmt(generatorDetails.mintimedown)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Economic</div>
                <div style={rowStyle}><span>Cost</span><span style={Muted as any}>{fmt(generatorDetails.cost)}</span></div>
                <div style={rowStyle}><span>Startup Cost</span><span style={Muted as any}>{fmt(generatorDetails.startupcost)}</span></div>
                <div style={rowStyle}><span>Cost C0</span><span style={Muted as any}>{fmt(generatorDetails.cost0)}</span></div>
                <div style={rowStyle}><span>Cost C2</span><span style={Muted as any}>{fmt(generatorDetails.cost2)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Dispatch</div>
                <div style={rowStyle}><span>Dispatch Enabled</span><span style={Muted as any}>{fmtBool(generatorDetails.enabled_dispatch)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Profiles</div>
                <div style={rowStyle}><span>P Profile</span><span style={Muted as any}>{generatorDetails.p_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>PF Profile</span><span style={Muted as any}>{generatorDetails.pf_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Vset Profile</span><span style={Muted as any}>{generatorDetails.vset_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Active Profile</span><span style={Muted as any}>{generatorDetails.active_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Cost Profile</span><span style={Muted as any}>{generatorDetails.cost_prof ? 'Present' : '-'}</span></div>
              </>
            )}
            
            {!generatorDetails && (
              <div style={{ marginTop: 8, fontSize: 12, color: '#64748b' }}>
                (Additional details loading...)
              </div>
            )}
          </>
        );
      }
      case 'load': {
        const l = selected.data as any;
        return (
          <>
            <div style={rowStyle}><span>Name</span><span style={Muted as any}>{l.name || l.idtag}</span></div>
            <div style={rowStyle}><span>Bus</span><span style={Muted as any}>{l.bus_idtag}</span></div>
            
            {loadDetails && (
              <>
                {loadDetails.code && <div style={rowStyle}><span>Code</span><span style={Muted as any}>{loadDetails.code}</span></div>}
                {loadDetails.rdfid && <div style={rowStyle}><span>RDF ID</span><span style={Muted as any} title={loadDetails.rdfid}>{loadDetails.rdfid.slice(0, 12)}...</span></div>}
                
                <div style={Divider} />
                {loadDetails.active != null && <div style={rowStyle}><span>Active</span><span style={Muted as any}>{String(loadDetails.active)}</span></div>}
                {loadDetails.conn && <div style={rowStyle}><span>Connection</span><span style={Muted as any}>{loadDetails.conn}</span></div>}
                {loadDetails.use_kw != null && <div style={rowStyle}><span>Use kW</span><span style={Muted as any}>{String(loadDetails.use_kw)}</span></div>}
                
                {(loadDetails.p != null || loadDetails.q != null) && (
                  <>
                    <div style={Divider} />
                    {loadDetails.p != null && <div style={rowStyle}><span>P</span><span style={Muted as any}>{loadDetails.p}</span></div>}
                    {loadDetails.q != null && <div style={rowStyle}><span>Q</span><span style={Muted as any}>{loadDetails.q}</span></div>}
                    {loadDetails.pa != null && <div style={rowStyle}><span>Pa</span><span style={Muted as any}>{loadDetails.pa}</span></div>}
                    {loadDetails.pb != null && <div style={rowStyle}><span>Pb</span><span style={Muted as any}>{loadDetails.pb}</span></div>}
                    {loadDetails.pc != null && <div style={rowStyle}><span>Pc</span><span style={Muted as any}>{loadDetails.pc}</span></div>}
                    {loadDetails.qa != null && <div style={rowStyle}><span>Qa</span><span style={Muted as any}>{loadDetails.qa}</span></div>}
                    {loadDetails.qb != null && <div style={rowStyle}><span>Qb</span><span style={Muted as any}>{loadDetails.qb}</span></div>}
                    {loadDetails.qc != null && <div style={rowStyle}><span>Qc</span><span style={Muted as any}>{loadDetails.qc}</span></div>}
                  </>
                )}
                
                {(loadDetails.ir != null || loadDetails.ii != null) && (
                  <>
                    <div style={Divider} />
                    {loadDetails.ir != null && <div style={rowStyle}><span>Ir</span><span style={Muted as any}>{loadDetails.ir}</span></div>}
                    {loadDetails.ir1 != null && <div style={rowStyle}><span>Ir1</span><span style={Muted as any}>{loadDetails.ir1}</span></div>}
                    {loadDetails.ir2 != null && <div style={rowStyle}><span>Ir2</span><span style={Muted as any}>{loadDetails.ir2}</span></div>}
                    {loadDetails.ir3 != null && <div style={rowStyle}><span>Ir3</span><span style={Muted as any}>{loadDetails.ir3}</span></div>}
                    {loadDetails.ii != null && <div style={rowStyle}><span>Ii</span><span style={Muted as any}>{loadDetails.ii}</span></div>}
                    {loadDetails.ii1 != null && <div style={rowStyle}><span>Ii1</span><span style={Muted as any}>{loadDetails.ii1}</span></div>}
                    {loadDetails.ii2 != null && <div style={rowStyle}><span>Ii2</span><span style={Muted as any}>{loadDetails.ii2}</span></div>}
                    {loadDetails.ii3 != null && <div style={rowStyle}><span>Ii3</span><span style={Muted as any}>{loadDetails.ii3}</span></div>}
                  </>
                )}
                
                {(loadDetails.g != null || loadDetails.b != null) && (
                  <>
                    <div style={Divider} />
                    {loadDetails.g != null && <div style={rowStyle}><span>G</span><span style={Muted as any}>{loadDetails.g}</span></div>}
                    {loadDetails.g1 != null && <div style={rowStyle}><span>G1</span><span style={Muted as any}>{loadDetails.g1}</span></div>}
                    {loadDetails.g2 != null && <div style={rowStyle}><span>G2</span><span style={Muted as any}>{loadDetails.g2}</span></div>}
                    {loadDetails.g3 != null && <div style={rowStyle}><span>G3</span><span style={Muted as any}>{loadDetails.g3}</span></div>}
                    {loadDetails.b != null && <div style={rowStyle}><span>B</span><span style={Muted as any}>{loadDetails.b}</span></div>}
                    {loadDetails.b1 != null && <div style={rowStyle}><span>B1</span><span style={Muted as any}>{loadDetails.b1}</span></div>}
                    {loadDetails.b2 != null && <div style={rowStyle}><span>B2</span><span style={Muted as any}>{loadDetails.b2}</span></div>}
                    {loadDetails.b3 != null && <div style={rowStyle}><span>B3</span><span style={Muted as any}>{loadDetails.b3}</span></div>}
                  </>
                )}
                
                {(loadDetails.longitude != null || loadDetails.latitude != null) && (
                  <>
                    <div style={Divider} />
                    <div style={rowStyle}><span>Lon/Lat</span><span style={Muted as any}>{loadDetails.longitude} / {loadDetails.latitude}</span></div>
                  </>
                )}
                
                {(loadDetails.cost != null || loadDetails.capex != null || loadDetails.opex != null) && (
                  <>
                    <div style={Divider} />
                    {loadDetails.cost != null && <div style={rowStyle}><span>Cost</span><span style={Muted as any}>{loadDetails.cost}</span></div>}
                    {loadDetails.capex != null && <div style={rowStyle}><span>Capex</span><span style={Muted as any}>{loadDetails.capex}</span></div>}
                    {loadDetails.opex != null && <div style={rowStyle}><span>Opex</span><span style={Muted as any}>{loadDetails.opex}</span></div>}
                  </>
                )}
                
                {(loadDetails.mttf != null || loadDetails.mttr != null) && (
                  <>
                    <div style={Divider} />
                    {loadDetails.mttf != null && <div style={rowStyle}><span>MTTF</span><span style={Muted as any}>{loadDetails.mttf}</span></div>}
                    {loadDetails.mttr != null && <div style={rowStyle}><span>MTTR</span><span style={Muted as any}>{loadDetails.mttr}</span></div>}
                  </>
                )}
                
                {(loadDetails.build_status || loadDetails.facility || loadDetails.modelling_authority) && (
                  <>
                    <div style={Divider} />
                    {loadDetails.build_status && <div style={rowStyle}><span>Build status</span><span style={Muted as any}>{loadDetails.build_status}</span></div>}
                    {loadDetails.facility && <div style={rowStyle}><span>Facility</span><span style={Muted as any}>{loadDetails.facility}</span></div>}
                    {loadDetails.modelling_authority && <div style={rowStyle}><span>Authority</span><span style={Muted as any}>{loadDetails.modelling_authority}</span></div>}
                  </>
                )}
                
                {loadDetails.scalable != null && <div style={rowStyle}><span>Scalable</span><span style={Muted as any}>{String(loadDetails.scalable)}</span></div>}
                {loadDetails.shift_key != null && <div style={rowStyle}><span>Shift key</span><span style={Muted as any}>{loadDetails.shift_key}</span></div>}
                {loadDetails.n_customers != null && <div style={rowStyle}><span>Customers</span><span style={Muted as any}>{loadDetails.n_customers}</span></div>}
                {loadDetails.bus_pos != null && <div style={rowStyle}><span>Bus position</span><span style={Muted as any}>{loadDetails.bus_pos}</span></div>}
                
                {loadDetails.action && <div style={rowStyle}><span>Action</span><span style={Muted as any}>{loadDetails.action}</span></div>}
                {loadDetails.comment && <div style={rowStyle}><span>Comment</span><span style={Muted as any}>{loadDetails.comment}</span></div>}
                
                {(loadDetails.commissioned_date != null || loadDetails.decommissioned_date != null) && (
                  <>
                    <div style={Divider} />
                    {loadDetails.commissioned_date != null && <div style={rowStyle}><span>Commissioned</span><span style={Muted as any}>{loadDetails.commissioned_date}</span></div>}
                    {loadDetails.decommissioned_date != null && <div style={rowStyle}><span>Decommissioned</span><span style={Muted as any}>{loadDetails.decommissioned_date}</span></div>}
                  </>
                )}
                
                {(loadDetails.technologies && loadDetails.technologies.length > 0) && (
                  <>
                    <div style={Divider} />
                    <div style={rowStyle}><span>Technologies</span><span style={Muted as any}>{loadDetails.technologies.length} items</span></div>
                  </>
                )}
                
                {(loadDetails.p_prof || loadDetails.q_prof || loadDetails.active_prof || loadDetails.cost_prof) && (
                  <>
                    <div style={Divider} />
                    {loadDetails.p_prof && <div style={rowStyle}><span>P profile</span><span style={Muted as any}>Present</span></div>}
                    {loadDetails.q_prof && <div style={rowStyle}><span>Q profile</span><span style={Muted as any}>Present</span></div>}
                    {loadDetails.active_prof && <div style={rowStyle}><span>Active profile</span><span style={Muted as any}>Present</span></div>}
                    {loadDetails.cost_prof && <div style={rowStyle}><span>Cost profile</span><span style={Muted as any}>Present</span></div>}
                    {loadDetails.shift_key_prof && <div style={rowStyle}><span>Shift key prof</span><span style={Muted as any}>Present</span></div>}
                  </>
                )}
              </>
            )}
            
            {!loadDetails && (
              <>
                {l.p_mw != null && <div style={rowStyle}><span>P (MW)</span><span style={Muted as any}>{l.p_mw}</span></div>}
                {l.q_mvar != null && <div style={rowStyle}><span>Q (MVAr)</span><span style={Muted as any}>{l.q_mvar}</span></div>}
              </>
            )}
          </>
        );
      }
      case 'shunt': {
        const s = selected.data as any;
        const fmt = (val: any) => {
          if (val == null) return '-';
          if (typeof val === 'object') return 'Complex Object';
          if (typeof val === 'number') return val.toFixed(6);
          return val;
        };
        const fmtBool = (val: any) => val != null ? (val ? 'Yes' : 'No') : '-';

        return (
          <>
            <div style={rowStyle}><span>Name</span><span style={Muted as any}>{s.name || s.idtag}</span></div>
            <div style={rowStyle}><span>Bus</span><span style={Muted as any}>{s.bus_idtag}</span></div>
            
            {shuntDetails && (
              <>
                <div style={rowStyle}><span>Code</span><span style={Muted as any}>{fmt(shuntDetails.code)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Status</div>
                <div style={rowStyle}><span>Active</span><span style={Muted as any}>{fmtBool(shuntDetails.active)}</span></div>
                <div style={rowStyle}><span>Scalable</span><span style={Muted as any}>{fmtBool(shuntDetails.scalable)}</span></div>
                <div style={rowStyle}><span>Use kW</span><span style={Muted as any}>{fmtBool(shuntDetails.use_kw)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Admittance (G)</div>
                <div style={rowStyle}><span>G (S)</span><span style={Muted as any}>{fmt(shuntDetails.g)}</span></div>
                <div style={rowStyle}><span>G0 (S)</span><span style={Muted as any}>{fmt(shuntDetails.g0)}</span></div>
                <div style={rowStyle}><span>Ga (S)</span><span style={Muted as any}>{fmt(shuntDetails.ga)}</span></div>
                <div style={rowStyle}><span>Gb (S)</span><span style={Muted as any}>{fmt(shuntDetails.gb)}</span></div>
                <div style={rowStyle}><span>Gc (S)</span><span style={Muted as any}>{fmt(shuntDetails.gc)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Susceptance (B)</div>
                <div style={rowStyle}><span>B (S)</span><span style={Muted as any}>{fmt(shuntDetails.b)}</span></div>
                <div style={rowStyle}><span>B0 (S)</span><span style={Muted as any}>{fmt(shuntDetails.b0)}</span></div>
                <div style={rowStyle}><span>Ba (S)</span><span style={Muted as any}>{fmt(shuntDetails.ba)}</span></div>
                <div style={rowStyle}><span>Bb (S)</span><span style={Muted as any}>{fmt(shuntDetails.bb)}</span></div>
                <div style={rowStyle}><span>Bc (S)</span><span style={Muted as any}>{fmt(shuntDetails.bc)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Connection</div>
                <div style={rowStyle}><span>Connection Type</span><span style={Muted as any}>{fmt(shuntDetails.conn)}</span></div>
                <div style={rowStyle}><span>Bus Position</span><span style={Muted as any}>{fmt(shuntDetails.bus_pos)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Economic</div>
                <div style={rowStyle}><span>Cost</span><span style={Muted as any}>{fmt(shuntDetails.cost)}</span></div>
                <div style={rowStyle}><span>CAPEX</span><span style={Muted as any}>{fmt(shuntDetails.capex)}</span></div>
                <div style={rowStyle}><span>OPEX</span><span style={Muted as any}>{fmt(shuntDetails.opex)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Reliability</div>
                <div style={rowStyle}><span>MTTF</span><span style={Muted as any}>{fmt(shuntDetails.mttf)}</span></div>
                <div style={rowStyle}><span>MTTR</span><span style={Muted as any}>{fmt(shuntDetails.mttr)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Location</div>
                <div style={rowStyle}><span>Longitude</span><span style={Muted as any}>{fmt(shuntDetails.longitude)}</span></div>
                <div style={rowStyle}><span>Latitude</span><span style={Muted as any}>{fmt(shuntDetails.latitude)}</span></div>
                <div style={rowStyle}><span>Facility</span><span style={Muted as any}>{fmt(shuntDetails.facility)}</span></div>

                <div style={Divider} />
                <div style={{ ...Title, fontSize: 14 }}>Profiles</div>
                <div style={rowStyle}><span>G Profile</span><span style={Muted as any}>{shuntDetails.g_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>G0 Profile</span><span style={Muted as any}>{shuntDetails.g0_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Ga Profile</span><span style={Muted as any}>{shuntDetails.ga_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Gb Profile</span><span style={Muted as any}>{shuntDetails.gb_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Gc Profile</span><span style={Muted as any}>{shuntDetails.gc_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>B Profile</span><span style={Muted as any}>{shuntDetails.b_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>B0 Profile</span><span style={Muted as any}>{shuntDetails.b0_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Ba Profile</span><span style={Muted as any}>{shuntDetails.ba_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Bb Profile</span><span style={Muted as any}>{shuntDetails.bb_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Bc Profile</span><span style={Muted as any}>{shuntDetails.bc_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Active Profile</span><span style={Muted as any}>{shuntDetails.active_prof ? 'Present' : '-'}</span></div>
                <div style={rowStyle}><span>Cost Profile</span><span style={Muted as any}>{shuntDetails.cost_prof ? 'Present' : '-'}</span></div>
              </>
            )}
            
            {!shuntDetails && (
              <div style={{ marginTop: 8, fontSize: 12, color: '#64748b' }}>
                (Additional details loading...)
              </div>
            )}
          </>
        );
      }
      default:
        return null;
    }
  };

  return (
    <aside style={{
      ...Box,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={Title}>
          {selected.kind.charAt(0).toUpperCase() + selected.kind.slice(1)}
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}>×</button>
      </div>
      <div style={Divider} />
      <div className="info-panel-scroll">
        {renderContent()}
      </div>
    </aside>
  );
};

export default InfoPanel;
