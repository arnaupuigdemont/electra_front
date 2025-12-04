import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isBusy?: boolean;
  errorText?: string | null;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isBusy = false,
  errorText = null,
}) => {
  if (!isOpen) return null;

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal} role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        {title && (
          <div id="confirm-title" style={styles.title}>{title}</div>
        )}
        <div style={styles.message}>{message}</div>
        {errorText && (
          <div style={styles.error}>{errorText}</div>
        )}
        <div style={styles.actions}>
          <button
            style={{ ...styles.button, ...styles.danger }}
            onClick={onConfirm}
            disabled={isBusy}
          >
            {isBusy ? 'Working…' : confirmText}
          </button>
          <button
            style={{ ...styles.button, ...styles.secondary }}
            onClick={onCancel}
            disabled={isBusy}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [k: string]: React.CSSProperties } = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#0b1220',
    color: '#e2e8f0',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    width: 'min(480px, 90vw)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 1.5,
    opacity: 0.95,
    marginBottom: 16,
  },
  error: {
    background: 'rgba(244,63,94,0.15)',
    color: '#fecaca',
    border: '1px solid rgba(244,63,94,0.35)',
    borderRadius: 8,
    padding: '8px 10px',
    marginBottom: 12,
    fontSize: 13,
  },
  actions: {
    display: 'flex',
    gap: 10,
    justifyContent: 'flex-end',
  },
  button: {
    padding: '8px 14px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(148,163,184,0.12)',
    color: '#e2e8f0',
    cursor: 'pointer',
    fontWeight: 600,
  },
  danger: {
    background: 'rgba(244,63,94,0.2)',
    borderColor: 'rgba(244,63,94,0.5)',
  },
  secondary: {
    background: 'rgba(100,116,139,0.15)',
  },
};

export default ConfirmModal;
