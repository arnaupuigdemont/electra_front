import React, { useState, useRef } from 'react';
import '../styles/components/MenuBar.css';
import { useGridModel } from '../hooks/GridContext';
import { useGridUpload } from '../hooks/useGridUpload';

interface MenuItem {
  label: string;
  items?: {
    label: string;
    action?: () => void;
    disabled?: boolean;
  }[];
}

const MenuBar: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { setModel } = useGridModel();
  const { upload, isUploading, error } = useGridUpload(setModel);

  const triggerFileDialog = () => fileInputRef.current?.click();

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await upload(file);
    } catch {
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setOpenIndex(null);
    }
  };

  const menuModel: MenuItem[] = [
    {
      label: 'File',
      items: [
        { label: isUploading ? 'Opening...' : 'Open…', action: isUploading ? undefined : triggerFileDialog, disabled: isUploading },
        { label: 'Save (soon)', disabled: true }
      ]
    },
    { label: 'View', items: [{ label: 'Reset Zoom (soon)', disabled: true }] },
    { label: 'Help', items: [{ label: 'Docs (soon)', disabled: true }, { label: 'About (soon)', disabled: true }] }
  ];

  return (
    <div className="menubar-root" onMouseLeave={() => setOpenIndex(null)}>
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
        {menuModel.map((m, i) => (
          <div
            key={m.label}
            className={`menu-trigger ${openIndex === i ? 'open' : ''}`}
            onMouseEnter={() => setOpenIndex(i)}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {m.label}
            {openIndex === i && m.items && (
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
    </div>
  );
};

export default MenuBar;