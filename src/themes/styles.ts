export const DEFAULT_STYLES = `
:root {
  --sa-primary: #1e3a8a;
  --sa-primary-hover: #172554;
  --sa-primary-text: #ffffff;
  --sa-secondary: #dc2626;
  --sa-secondary-hover: #b91c1c;
  --sa-secondary-text: #ffffff;
  --sa-danger: #dc2626;
  --sa-danger-hover: #b91c1c;
  --sa-danger-bg: #fef2f2;
  --sa-success: #16a34a;
  --sa-success-hover: #15803d;
  --sa-success-bg: #f0fdf4;
  --sa-warning: #d97706;
  --sa-warning-hover: #b45309;
  --sa-warning-bg: #fffbeb;
  --sa-info: #2563eb;
  --sa-info-hover: #1d4ed8;
  --sa-info-bg: #eff6ff;
  --sa-background: #ffffff;
  --sa-surface: #f8fafc;
  --sa-text: #0f172a;
  --sa-text-muted: #64748b;
  --sa-border: #e2e8f0;
  --sa-radius: 12px;
  --sa-radius-sm: 8px;
  --sa-radius-pill: 9999px;
  --sa-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08);
  --sa-toast-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.05);
  --sa-backdrop: rgba(15, 23, 42, 0.45);
  --sa-font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Devanagari', Mukta, sans-serif;
  --sa-transition: 200ms cubic-bezier(0.16, 1, 0.3, 1);
  --sa-accent-line: transparent;
}

.sa-theme-nepal {
  --sa-primary: #DC143C;
  --sa-primary-hover: #b81032;
  --sa-primary-text: #ffffff;
  --sa-secondary: #003893;
  --sa-secondary-hover: #002b70;
  --sa-secondary-text: #ffffff;
  --sa-background: #ffffff;
  --sa-surface: #fafaf9;
  --sa-text: #1c1917;
  --sa-text-muted: #57534e;
  --sa-border: #e7e5e4;
  --sa-radius: 12px;
  --sa-shadow: 0 20px 25px -5px rgba(220, 20, 60, 0.1), 0 8px 10px -6px rgba(0, 56, 147, 0.08);
  --sa-accent-line: #DC143C;
}

.sa-theme-light {
  --sa-primary: #2563eb;
  --sa-primary-hover: #1d4ed8;
  --sa-primary-text: #ffffff;
  --sa-secondary: #64748b;
  --sa-secondary-hover: #475569;
  --sa-secondary-text: #ffffff;
  --sa-background: #ffffff;
  --sa-surface: #f8fafc;
  --sa-text: #0f172a;
  --sa-text-muted: #64748b;
  --sa-border: #e2e8f0;
  --sa-radius: 12px;
  --sa-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  --sa-accent-line: transparent;
}

.sa-theme-dark {
  --sa-primary: #3b82f6;
  --sa-primary-hover: #60a5fa;
  --sa-primary-text: #0f172a;
  --sa-secondary: #475569;
  --sa-secondary-hover: #64748b;
  --sa-secondary-text: #f8fafc;
  --sa-danger: #ef4444;
  --sa-danger-hover: #f87171;
  --sa-danger-bg: rgba(239, 68, 68, 0.15);
  --sa-success: #22c55e;
  --sa-success-hover: #4ade80;
  --sa-success-bg: rgba(34, 197, 94, 0.15);
  --sa-warning: #f59e0b;
  --sa-warning-hover: #fbbf24;
  --sa-warning-bg: rgba(245, 158, 11, 0.15);
  --sa-info: #38bdf8;
  --sa-info-hover: #7dd3fc;
  --sa-info-bg: rgba(56, 189, 248, 0.15);
  --sa-background: #0f172a;
  --sa-surface: #1e293b;
  --sa-text: #f8fafc;
  --sa-text-muted: #94a3b8;
  --sa-border: #334155;
  --sa-radius: 12px;
  --sa-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  --sa-toast-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
  --sa-backdrop: rgba(0, 0, 0, 0.7);
  --sa-accent-line: transparent;
}

.sa-theme-minimal {
  --sa-primary: #18181b;
  --sa-primary-hover: #27272a;
  --sa-primary-text: #ffffff;
  --sa-secondary: #71717a;
  --sa-secondary-hover: #52525b;
  --sa-secondary-text: #ffffff;
  --sa-background: #ffffff;
  --sa-surface: #fafafa;
  --sa-text: #18181b;
  --sa-text-muted: #71717a;
  --sa-border: #18181b;
  --sa-radius: 0px;
  --sa-radius-sm: 0px;
  --sa-radius-pill: 0px;
  --sa-shadow: 4px 4px 0px #18181b;
  --sa-toast-shadow: 3px 3px 0px #18181b;
  --sa-backdrop: rgba(0, 0, 0, 0.3);
  --sa-accent-line: transparent;
}

.sa-backdrop {
  position: fixed;
  inset: 0;
  background-color: var(--sa-backdrop);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 999990;
  display: flex;
  box-sizing: border-box;
  padding: 16px;
  opacity: 0;
  transition: opacity var(--sa-transition);
  font-family: var(--sa-font-family);
}

.sa-backdrop.sa-visible {
  opacity: 1;
}

.sa-backdrop.sa-pos-center {
  align-items: center;
  justify-content: center;
}

.sa-backdrop.sa-pos-top {
  align-items: flex-start;
  justify-content: center;
  padding-top: 48px;
}

.sa-backdrop.sa-pos-bottom {
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 48px;
}

.sa-modal {
  position: relative;
  width: 100%;
  max-width: 440px;
  background: var(--sa-background);
  color: var(--sa-text);
  border: 1px solid var(--sa-border);
  border-radius: var(--sa-radius);
  box-shadow: var(--sa-shadow);
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transform: scale(0.94) translateY(8px);
  opacity: 0;
  transition: transform var(--sa-transition), opacity var(--sa-transition);
  overflow: hidden;
}

.sa-backdrop.sa-visible .sa-modal {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.sa-theme-nepal .sa-modal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--sa-accent-line);
}

.sa-close-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: var(--sa-radius-sm);
  border: none;
  background: transparent;
  color: var(--sa-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease, color 0.15s ease;
  padding: 0;
}

.sa-close-btn:hover {
  background-color: var(--sa-surface);
  color: var(--sa-text);
}

.sa-close-btn:focus-visible {
  outline: 2px solid var(--sa-primary);
  outline-offset: 2px;
}

.sa-icon-wrapper {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
}

.sa-icon-type-success {
  color: var(--sa-success);
  background-color: var(--sa-success-bg);
}

.sa-icon-type-error {
  color: var(--sa-danger);
  background-color: var(--sa-danger-bg);
}

.sa-icon-type-warning {
  color: var(--sa-warning);
  background-color: var(--sa-warning-bg);
}

.sa-icon-type-info {
  color: var(--sa-info);
  background-color: var(--sa-info-bg);
}

.sa-icon-type-loading {
  color: var(--sa-primary);
  background-color: var(--sa-surface);
}

.sa-icon-type-confirm {
  color: var(--sa-secondary);
  background-color: var(--sa-surface);
}

.sa-icon-type-action {
  color: var(--sa-primary);
  background-color: var(--sa-surface);
}

.sa-icon-type-undo {
  color: var(--sa-primary);
  background-color: var(--sa-surface);
}

.sa-icon-svg {
  width: 32px;
  height: 32px;
}

.sa-spin {
  animation: sa-spin 0.9s linear infinite;
}

@keyframes sa-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.sa-title {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.35;
  color: var(--sa-text);
  word-break: break-word;
}

.sa-message {
  margin: 0 0 20px 0;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--sa-text-muted);
  word-break: break-word;
}

.sa-message:last-child {
  margin-bottom: 0;
}

.sa-actions {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.sa-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  min-height: 42px;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: var(--sa-radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  font-family: inherit;
  flex: 1 1 auto;
  min-width: 100px;
}

.sa-btn:focus-visible {
  outline: 2px solid var(--sa-primary);
  outline-offset: 2px;
}

.sa-btn-primary {
  background-color: var(--sa-primary);
  color: var(--sa-primary-text);
  border-color: var(--sa-primary);
}

.sa-btn-primary:hover {
  background-color: var(--sa-primary-hover);
  border-color: var(--sa-primary-hover);
}

.sa-btn-secondary {
  background-color: var(--sa-surface);
  color: var(--sa-text);
  border-color: var(--sa-border);
}

.sa-btn-secondary:hover {
  background-color: var(--sa-border);
}

.sa-btn-danger {
  background-color: var(--sa-danger);
  color: #ffffff;
  border-color: var(--sa-danger);
}

.sa-btn-danger:hover {
  background-color: var(--sa-danger-hover);
  border-color: var(--sa-danger-hover);
}

.sa-btn-undo {
  background-color: var(--sa-primary);
  color: var(--sa-primary-text);
  padding: 6px 14px;
  min-height: 32px;
  font-size: 0.8125rem;
}

.sa-toast-container {
  position: fixed;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  pointer-events: none;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--sa-font-family);
}

.sa-toast-container.sa-pos-top-right {
  top: 0;
  right: 0;
  align-items: flex-end;
}

.sa-toast-container.sa-pos-top-left {
  top: 0;
  left: 0;
  align-items: flex-start;
}

.sa-toast-container.sa-pos-bottom-right {
  bottom: 0;
  right: 0;
  align-items: flex-end;
}

.sa-toast-container.sa-pos-bottom-left {
  bottom: 0;
  left: 0;
  align-items: flex-start;
}

.sa-toast-container.sa-pos-top {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}

.sa-toast-container.sa-pos-bottom {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}

.sa-toast {
  pointer-events: auto;
  min-width: 280px;
  max-width: 380px;
  background: var(--sa-background);
  color: var(--sa-text);
  border: 1px solid var(--sa-border);
  border-radius: var(--sa-radius-sm);
  box-shadow: var(--sa-toast-shadow);
  padding: 12px 14px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
  transition: opacity var(--sa-transition), transform var(--sa-transition), margin-top var(--sa-transition);
  position: relative;
  overflow: hidden;
}

.sa-toast.sa-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.sa-theme-nepal .sa-toast {
  border-left: 3px solid var(--sa-primary);
}

.sa-toast-icon {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  margin-top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sa-toast-icon .sa-icon-svg {
  width: 20px;
  height: 20px;
}

.sa-toast-content {
  flex: 1 1 auto;
  min-width: 0;
}

.sa-toast-title {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 2px 0;
  color: var(--sa-text);
}

.sa-toast-message {
  font-size: 0.8125rem;
  line-height: 1.4;
  margin: 0;
  color: var(--sa-text-muted);
  word-break: break-word;
}

.sa-toast-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}

.sa-toast-close {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: none;
  background: transparent;
  color: var(--sa-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.sa-toast-close:hover {
  background-color: var(--sa-surface);
  color: var(--sa-text);
}

.sa-toast-close .sa-icon-svg {
  width: 14px;
  height: 14px;
}

@media (prefers-reduced-motion: reduce) {
  .sa-backdrop,
  .sa-modal,
  .sa-toast,
  .sa-spin {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

@media (max-width: 480px) {
  .sa-backdrop {
    padding: 12px;
  }
  .sa-modal {
    padding: 20px 16px;
  }
  .sa-actions {
    flex-direction: column;
  }
  .sa-btn {
    width: 100%;
  }
  .sa-toast {
    min-width: 0;
    width: calc(100vw - 32px);
  }
}
`;
