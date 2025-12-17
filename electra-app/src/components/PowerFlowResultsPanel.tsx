import React, { useState } from 'react';
import type { Bus, Line, Transformer2W } from '../services/gridcalApi';
import '../styles/components/InfoPanel.css'; // For animation keyframes

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

interface PowerFlowResultsPanelProps {
  busResults: BusResult[];
  branchResults: BranchResult[];
  buses: Bus[];
  orderedBusIds: number[];
  orderedLines: Line[];
  orderedTransformers: Transformer2W[];
  converged: boolean;
  error: number;
  onClose: () => void;
}

const PowerFlowResultsPanel: React.FC<PowerFlowResultsPanelProps> = ({
  busResults,
  branchResults,
  buses,
  orderedBusIds,
  orderedLines,
  orderedTransformers,
  converged,
  error,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'buses' | 'branches'>('buses');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const wrapperStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 1000,
    display: 'flex',
    animation: 'slideInFromLeft 0.3s ease-out'
  };

  const Box: React.CSSProperties = {
    width: isCollapsed ? 40 : 550,
    minWidth: isCollapsed ? 40 : 550,
    maxWidth: isCollapsed ? 40 : 650,
    background: '#0b1220',
    color: '#e5e7eb',
    border: '1px solid #334155',
    borderRadius: 0,
    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease, min-width 0.3s ease',
    overflow: 'hidden'
  };

  const headerStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderBottom: '1px solid #334155',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 8
  };

  const tabsContainerStyle: React.CSSProperties = {
    display: 'flex',
    borderBottom: '1px solid #334155',
    flexShrink: 0
  };

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '10px 16px',
    background: isActive ? '#1e293b' : 'transparent',
    color: isActive ? '#60a5fa' : '#94a3b8',
    border: 'none',
    borderBottom: isActive ? '2px solid #60a5fa' : '2px solid transparent',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.2s'
  });

  const tableContainerStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: '8px 0'
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 12
  };

  const thStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    background: '#1e293b',
    padding: '8px 12px',
    textAlign: 'left',
    fontWeight: 600,
    color: '#94a3b8',
    borderBottom: '1px solid #334155'
  };

  const tdStyle: React.CSSProperties = {
    padding: '6px 12px',
    borderBottom: '1px solid #1e293b',
    color: '#e5e7eb'
  };

  const statusStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderBottom: '1px solid #334155',
    fontSize: 12,
    display: 'flex',
    gap: 16,
    flexShrink: 0
  };

  const collapseButtonStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: 18,
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Create a map from bus id to bus name for display
  const busNameMap = new Map<number, string>();
  buses.forEach(b => busNameMap.set(b.id, b.name || b.idtag));

  const formatNumber = (n: number, decimals = 4) => {
    if (n == null || isNaN(n)) return '-';
    return n.toFixed(decimals);
  };

  if (isCollapsed) {
    return (
      <div style={wrapperStyle}>
        <aside style={Box}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '12px 0',
            gap: 8
          }}>
            <button 
              onClick={() => setIsCollapsed(false)} 
              style={collapseButtonStyle}
              title="Expand panel"
            >
              ▶
            </button>
            <div style={{ 
              writingMode: 'vertical-rl', 
              textOrientation: 'mixed',
              fontSize: 12,
              color: '#94a3b8',
              marginTop: 8
            }}>
              Power Flow Results
            </div>
          </div>
        </aside>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <aside style={Box}>
        <div style={headerStyle}>
          <div style={titleStyle}>
            <span>Power Flow Results</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={() => setIsCollapsed(true)} 
              style={collapseButtonStyle}
              title="Collapse panel"
            >
              ◀
            </button>
            <button 
              onClick={onClose} 
              style={{ ...collapseButtonStyle, fontSize: 16 }}
              title="Close panel"
            >
              ×
            </button>
          </div>
        </div>

        <div style={statusStyle}>
          <span>
            Status: <span style={{ color: converged ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
              {converged ? 'Converged' : 'Not Converged'}
            </span>
          </span>
          <span style={{ color: '#94a3b8' }}>
            Error: {formatNumber(error, 6)}
          </span>
        </div>

        <div style={tabsContainerStyle}>
          <button 
            style={tabStyle(activeTab === 'buses')} 
            onClick={() => setActiveTab('buses')}
          >
            Buses ({busResults.length})
          </button>
          <button 
            style={tabStyle(activeTab === 'branches')} 
            onClick={() => setActiveTab('branches')}
          >
            Branches ({branchResults.length})
          </button>
        </div>

        <div style={tableContainerStyle}>
          {activeTab === 'buses' ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Bus</th>
                  <th style={thStyle}>Vm (pu)</th>
                  <th style={thStyle}>Va (°)</th>
                  <th style={thStyle}>P (MW)</th>
                  <th style={thStyle}>Q (MVAr)</th>
                </tr>
              </thead>
              <tbody>
                {busResults.map((result, index) => {
                  const busId = orderedBusIds[index];
                  const busName = busNameMap.get(busId) || `Bus ${index + 1}`;
                  return (
                    <tr key={index} style={{ background: index % 2 === 0 ? 'transparent' : '#0f172a' }}>
                      <td style={tdStyle}>{index + 1}</td>
                      <td style={{ ...tdStyle, maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={busName}>
                        {busName}
                      </td>
                      <td style={tdStyle}>{formatNumber(result.Vm)}</td>
                      <td style={tdStyle}>{formatNumber(result.Va, 2)}</td>
                      <td style={tdStyle}>{formatNumber(result.P, 2)}</td>
                      <td style={tdStyle}>{formatNumber(result.Q, 2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Pf (MW)</th>
                  <th style={thStyle}>Pt (MW)</th>
                  <th style={thStyle}>Loading (%)</th>
                  <th style={thStyle}>Ploss (MW)</th>
                  <th style={thStyle}>Qloss (MVAr)</th>
                </tr>
              </thead>
              <tbody>
                {branchResults.map((result, index) => {
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
                  return (
                    <tr key={index} style={{ background: index % 2 === 0 ? 'transparent' : '#0f172a' }}>
                      <td style={tdStyle}>{index + 1}</td>
                      <td style={{ ...tdStyle, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={branchName}>
                        {branchName}
                      </td>
                      <td style={{ ...tdStyle, color: isLine ? '#60a5fa' : '#f59e0b' }}>
                        {isLine ? 'Line' : 'Tx'}
                      </td>
                      <td style={tdStyle}>{formatNumber(result.Pf, 2)}</td>
                      <td style={tdStyle}>{formatNumber(result.Pt, 2)}</td>
                      <td style={{ 
                        ...tdStyle, 
                        color: result.loading > 100 ? '#ef4444' : result.loading > 80 ? '#f59e0b' : '#22c55e' 
                      }}>
                        {formatNumber(result.loading, 1)}%
                      </td>
                      <td style={tdStyle}>{formatNumber(result.Ploss, 4)}</td>
                      <td style={tdStyle}>{formatNumber(result.Qloss, 4)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </aside>
    </div>
  );
};

export default PowerFlowResultsPanel;
