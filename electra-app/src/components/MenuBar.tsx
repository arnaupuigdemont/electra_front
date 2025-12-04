import React, { useState, useRef } from 'react';
import '../styles/components/MenuBar.css';
import { useGridModel } from '../hooks/GridContext';
import { useGridUpload } from '../hooks/useGridUpload';
import ReusableConfirmModal from './ReusableConfirmModal';
import { deleteGrid, calculatePowerFlow } from '../services/gridcalApi';

interface MenuItem {
  label: string;
  items?: {
    label: string;
    action?: () => void;
    disabled?: boolean;
  }[];
}

const MenuBar: React.FC = () => {
  // Track which menu label is open so we can render left/right groups independently
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { selectedGridId, setSelectedGridId, setPowerFlowResults, setIsPowerFlowCalculating } = useGridModel();
  const { upload, isUploading, error } = useGridUpload((res) => setSelectedGridId(res.grid_id));
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [closeError, setCloseError] = useState<string | null>(null);
  const [isPowerFlowRunning, setIsPowerFlowRunning] = useState(false);
  const [showPowerFlowConfirm, setShowPowerFlowConfirm] = useState(false);
  const [powerFlowError, setPowerFlowError] = useState<string | null>(null);

  const triggerFileDialog = () => fileInputRef.current?.click();

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await upload(file);
    } catch {
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setOpenLabel(null);
    }
  };

  const openCloseDialog = () => {
    setCloseError(null);
    setShowCloseConfirm(true);
    // also hide dropdown
    setOpenLabel(null);
  };

  const onConfirmClose = async () => {
    if (selectedGridId == null) return;
    try {
      setIsClosing(true);
      setCloseError(null);
      await deleteGrid(selectedGridId);
      // refresh the whole page so the grid disappears
      window.location.reload();
    } catch (e: any) {
      setCloseError(e?.message ?? 'Failed to close the grid');
    } finally {
      setIsClosing(false);
    }
  };

  const handlePowerFlow = async () => {
    if (selectedGridId == null) {
      console.log('No grid selected, selectedGridId:', selectedGridId);
      return;
    }
    setShowPowerFlowConfirm(true);
  };

  const onConfirmPowerFlow = async () => {
    setShowPowerFlowConfirm(false);
    setOpenLabel(null);
    try {
      setIsPowerFlowRunning(true);
      setIsPowerFlowCalculating(true);
      const results = await calculatePowerFlow(selectedGridId!);
      setPowerFlowResults(results);
    } catch (e: any) {
      setPowerFlowError(e?.message ?? 'Failed to calculate power flow');
      alert(`Error: ${e?.message ?? 'Failed to calculate power flow'}`);
    } finally {
      setIsPowerFlowRunning(false);
      setIsPowerFlowCalculating(false);
    }
  };

  const onCancelPowerFlow = () => {
    setShowPowerFlowConfirm(false);
    setOpenLabel(null);
  };

  const menuModel: MenuItem[] = [
    {
      label: 'File',
      items: [
  { label: isUploading ? 'Opening...' : 'Open…', action: (isUploading || selectedGridId != null) ? undefined : triggerFileDialog, disabled: isUploading || selectedGridId != null },
        { label: 'Save (soon)', disabled: true },
        { label: 'Export (soon)', disabled: true },
        { label: 'Close…', action: selectedGridId != null && !isUploading ? openCloseDialog : undefined, disabled: selectedGridId == null || isUploading }
      ]
    },
    { 
      label: 'Analysis', 
      items: [
        { 
          label: isPowerFlowRunning ? 'Running Power Flow...' : 'Power Flow', 
          action: selectedGridId != null && !isPowerFlowRunning ? handlePowerFlow : undefined, 
          disabled: selectedGridId == null || isPowerFlowRunning 
        }
      ] 
    },
    { label: 'Help', items: [{ label: 'Docs (soon)', disabled: true }, { label: 'About (soon)', disabled: true }] }
  ];

  const leftMenus = menuModel.filter(m => m.label !== 'Help');
  const rightMenus = menuModel.filter(m => m.label === 'Help');

  return (
    <div className="menubar-root" onMouseLeave={() => setOpenLabel(null)}>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        accept=".veragrid,.gridcal,.json,.zip"
        onChange={handleFileSelected}
      />
      <div className="menubar-left">
        <div className="brand">
            <span className="brand-icon">⚡</span>
            <span className="brand-text">Electra</span>
        </div>
        {leftMenus.map((m) => (
          <div
            key={m.label}
            className={`menu-trigger ${openLabel === m.label ? 'open' : ''}`}
            onMouseEnter={() => setOpenLabel(m.label)}
            onClick={() => setOpenLabel(openLabel === m.label ? null : m.label)}
          >
            {m.label}
            {openLabel === m.label && m.items && (
              <div className="dropdown">
                {m.items.map(sub => (
                  <button
                    key={sub.label}
                    className="dropdown-item"
                    disabled={sub.disabled}
                    onClick={sub.action}
                  >
                    {sub.label}
                  </button>
                ))}
                {error && <div className="dropdown-item" style={{ opacity: 0.7, cursor: 'default' }}>Error: {error}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="menubar-right">
        {rightMenus.map((m) => (
          <div
            key={m.label}
            className={`menu-trigger ${openLabel === m.label ? 'open' : ''}`}
            onMouseEnter={() => setOpenLabel(m.label)}
            onClick={() => setOpenLabel(openLabel === m.label ? null : m.label)}
          >
            {m.label}
            {openLabel === m.label && m.items && (
              <div className="dropdown" style={{ right: 0, left: 'auto' }}>
                {m.items.map(sub => (
                  <button
                    key={sub.label}
                    className="dropdown-item"
                    disabled={sub.disabled}
                    onClick={sub.action}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <ReusableConfirmModal
        isOpen={showPowerFlowConfirm}
        title="Calcular Power Flow"
        message="Se va a calcular el Power Flow. Esto puede tardar un poco. ¿Deseas continuar?"
        confirmText="Sí, calcular"
        cancelText="No"
        onConfirm={onConfirmPowerFlow}
        onCancel={onCancelPowerFlow}
        isBusy={isPowerFlowRunning}
        errorText={powerFlowError}
        confirmColor="primary"
      />
      <ReusableConfirmModal
        isOpen={showCloseConfirm}
        title="Close Grid"
        message="Are you sure you want to close the Grid?"
        confirmText="Yes, close"
        cancelText="No"
        onConfirm={onConfirmClose}
        onCancel={() => { if (!isClosing) setShowCloseConfirm(false); }}
        isBusy={isClosing}
        errorText={closeError}
        confirmColor="danger"
      />
    </div>
  );
};

export default MenuBar;