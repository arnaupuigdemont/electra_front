import React from 'react';
import type { BusDetails } from '../services/gridcalApi';

export type SelectedItem =
  | { kind: 'bus'; data: any }
  | { kind: 'line'; data: { fromKey: string; toKey: string } }
  | { kind: 'transformer'; data: { fromKey: string; toKey: string } }
  | { kind: 'generator'; data: { idtag: string; bus_idtag: string; name?: string } }
  | { kind: 'load'; data: { idtag: string; bus_idtag: string; name?: string; p_mw?: number; q_mvar?: number } }
  | { kind: 'shunt'; data: { idtag: string; bus_idtag: string; name?: string } };

interface InfoPanelProps {
  selected: SelectedItem | null;
  onClose: () => void;
  busDetails?: BusDetails | null;
}

const rowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', marginBottom: 6 };

const InfoPanel: React.FC<InfoPanelProps> = ({ selected, onClose, busDetails }) => {
  if (!selected) return null;

  const Box: React.CSSProperties = {
    width: 320,
    minWidth: 320,
    maxWidth: 360,
    background: '#0b1220',
    color: '#e5e7eb',
    border: '1px solid #334155',
    borderRadius: 16,
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
            <div style={rowStyle}><span>Coords</span><span style={Muted as any}>({b.x}, {b.y})</span></div>
            {busDetails && (
              <>
                <div style={Divider} />
                <div style={rowStyle}><span>Slack</span><span style={Muted as any}>{String(busDetails.is_slack)}</span></div>
                {busDetails.vnom != null && <div style={rowStyle}><span>Vnom</span><span style={Muted as any}>{busDetails.vnom}</span></div>}
                {busDetails.vmin != null && <div style={rowStyle}><span>Vmin/Vmax</span><span style={Muted as any}>{busDetails.vmin} / {busDetails.vmax}</span></div>}
                {busDetails.angle_min != null && <div style={rowStyle}><span>Angle range</span><span style={Muted as any}>{busDetails.angle_min} .. {busDetails.angle_max}</span></div>}
                {busDetails.graphic_type && <div style={rowStyle}><span>Graphic</span><span style={Muted as any}>{busDetails.graphic_type}</span></div>}
                {(busDetails.h != null || busDetails.w != null) && <div style={rowStyle}><span>H×W</span><span style={Muted as any}>{busDetails.h} × {busDetails.w}</span></div>}
              </>
            )}
          </>
        );
      }
      case 'line':
      case 'transformer': {
        const d = selected.data as { fromKey: string; toKey: string };
        return (
          <>
            <div style={rowStyle}><span>From</span><span style={Muted as any}>{d.fromKey}</span></div>
            <div style={rowStyle}><span>To</span><span style={Muted as any}>{d.toKey}</span></div>
          </>
        );
      }
      case 'generator': {
        const g = selected.data as any;
        return (
          <>
            <div style={rowStyle}><span>Gen</span><span style={Muted as any}>{g.name || g.idtag}</span></div>
            <div style={rowStyle}><span>Bus</span><span style={Muted as any}>{g.bus_idtag}</span></div>
          </>
        );
      }
      case 'load': {
        const l = selected.data as any;
        return (
          <>
            <div style={rowStyle}><span>Load</span><span style={Muted as any}>{l.name || l.idtag}</span></div>
            <div style={rowStyle}><span>Bus</span><span style={Muted as any}>{l.bus_idtag}</span></div>
            {l.p_mw != null && <div style={rowStyle}><span>P (MW)</span><span style={Muted as any}>{l.p_mw}</span></div>}
            {l.q_mvar != null && <div style={rowStyle}><span>Q (MVAr)</span><span style={Muted as any}>{l.q_mvar}</span></div>}
          </>
        );
      }
      case 'shunt': {
        const s = selected.data as any;
        return (
          <>
            <div style={rowStyle}><span>Shunt</span><span style={Muted as any}>{s.name || s.idtag}</span></div>
            <div style={rowStyle}><span>Bus</span><span style={Muted as any}>{s.bus_idtag}</span></div>
          </>
        );
      }
      default:
        return null;
    }
  };

  return (
    <aside style={Box}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={Title}>
          {selected.kind.charAt(0).toUpperCase() + selected.kind.slice(1)}
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}>×</button>
      </div>
      <div style={Divider} />
      {renderContent()}
    </aside>
  );
};

export default InfoPanel;
