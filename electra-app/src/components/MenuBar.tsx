import React, { useState, useRef } from 'react';
import '../styles/components/MenuBar.css';
import { useGridModel } from '../hooks/GridContext';
import { useGridUpload } from '../hooks/useGridUpload';
import ConfirmModal from './ConfirmModal';
import { deleteGrid } from '../services/gridcalApi';

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
  const { selectedGridId, setSelectedGridId } = useGridModel();
  const { upload, isUploading, error } = useGridUpload((res) => setSelectedGridId(res.grid_id));
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [closeError, setCloseError] = useState<string | null>(null);

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

  const menuModel: MenuItem[] = [
    {
      label: 'File',
      items: [
        { label: isUploading ? 'Opening...' : 'Open…', action: isUploading ? undefined : triggerFileDialog, disabled: isUploading },
        { label: 'Save (soon)', disabled: true },
        { label: 'Export (soon)', disabled: true },
        { label: 'Close…', action: selectedGridId != null && !isUploading ? openCloseDialog : undefined, disabled: selectedGridId == null || isUploading }
      ]
    },
    { label: 'View', items: [{ label: 'Reset Zoom (soon)', disabled: true }] },
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
      <ConfirmModal
        isOpen={showCloseConfirm}
        title="Close Grid"
        message="Are you sure you want to close the Grid?"
        confirmText="Yes, close"
        cancelText="No"
        onConfirm={onConfirmClose}
        onCancel={() => { if (!isClosing) setShowCloseConfirm(false); }}
        isBusy={isClosing}
        errorText={closeError}
      />
    </div>
  );
};

export default MenuBar;