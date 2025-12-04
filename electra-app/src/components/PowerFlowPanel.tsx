import React from 'react';
import type { BusResult, BranchResult } from '../types/powerFlowResults';
import '../styles/components/PowerFlowPanel.css';

export type PowerFlowPanelProps = {
  kind: 'bus' | 'line' | 'transformer';
  elementId: number;
  result: BusResult | BranchResult | null;
};

const rowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', marginBottom: 6 };

const PowerFlowPanel: React.FC<PowerFlowPanelProps> = ({ kind, result }) => {
  if (!result) {
    return null;
  }

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

  const fmt = (val: number) => val.toFixed(4);

  const renderContent = () => {
    if (kind === 'bus') {
      const busResult = result as BusResult;
      return (
        <>
          <div style={rowStyle}><span>Voltage Magnitude (Vm)</span><span style={Muted as any}>{fmt(busResult.Vm)} p.u.</span></div>
          <div style={rowStyle}><span>Voltage Angle (Va)</span><span style={Muted as any}>{fmt(busResult.Va)}°</span></div>
          <div style={Divider} />
          <div style={rowStyle}><span>Active Power (P)</span><span style={Muted as any}>{fmt(busResult.P)} MW</span></div>
          <div style={rowStyle}><span>Reactive Power (Q)</span><span style={Muted as any}>{fmt(busResult.Q)} MVAr</span></div>
        </>
      );
    } else {
      // line or transformer
      const branchResult = result as BranchResult;
      return (
        <>
          <div style={{ ...Title, fontSize: 14 }}>From Side</div>
          <div style={rowStyle}><span>Active Power (Pf)</span><span style={Muted as any}>{fmt(branchResult.Pf)} MW</span></div>
          <div style={rowStyle}><span>Reactive Power (Qf)</span><span style={Muted as any}>{fmt(branchResult.Qf)} MVAr</span></div>
          
          <div style={Divider} />
          <div style={{ ...Title, fontSize: 14 }}>To Side</div>
          <div style={rowStyle}><span>Active Power (Pt)</span><span style={Muted as any}>{fmt(branchResult.Pt)} MW</span></div>
          <div style={rowStyle}><span>Reactive Power (Qt)</span><span style={Muted as any}>{fmt(branchResult.Qt)} MVAr</span></div>
          
          <div style={Divider} />
          <div style={{ ...Title, fontSize: 14 }}>Losses & Loading</div>
          <div style={rowStyle}><span>Active Losses (Ploss)</span><span style={Muted as any}>{fmt(branchResult.Ploss)} MW</span></div>
          <div style={rowStyle}><span>Reactive Losses (Qloss)</span><span style={Muted as any}>{fmt(branchResult.Qloss)} MVAr</span></div>
          <div style={rowStyle}><span>Loading</span><span style={Muted as any}>{fmt(branchResult.loading)} %</span></div>
        </>
      );
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
          Power Flow Results
        </div>
      </div>
      <div style={Divider} />
      <div className="power-flow-panel-scroll">
        {renderContent()}
      </div>
    </aside>
  );
};

export default PowerFlowPanel;
