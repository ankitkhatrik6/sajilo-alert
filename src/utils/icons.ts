import type { AlertType } from '../core/types';

export const ICONS: Record<string, string> = {
  success: `<svg class="sa-icon-svg sa-icon-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle class="sa-icon-circle" cx="12" cy="12" r="10"></circle>
    <path class="sa-icon-check" d="m6.5 12.5 3.5 3.5 7.5-7.5"></path>
  </svg>`,

  error: `<svg class="sa-icon-svg sa-icon-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle class="sa-icon-circle" cx="12" cy="12" r="10"></circle>
    <line class="sa-icon-x-1" x1="15" y1="9" x2="9" y2="15"></line>
    <line class="sa-icon-x-2" x1="9" y1="9" x2="15" y2="15"></line>
  </svg>`,

  warning: `<svg class="sa-icon-svg sa-icon-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path class="sa-icon-triangle" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line class="sa-icon-excl-line" x1="12" y1="9" x2="12" y2="13"></line>
    <line class="sa-icon-excl-dot" x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>`,

  info: `<svg class="sa-icon-svg sa-icon-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle class="sa-icon-circle" cx="12" cy="12" r="10"></circle>
    <line class="sa-icon-info-line" x1="12" y1="16" x2="12" y2="12"></line>
    <line class="sa-icon-info-dot" x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>`,

  loading: `<svg class="sa-icon-svg sa-icon-loading sa-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </svg>`,

  confirm: `<svg class="sa-icon-svg sa-icon-confirm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle class="sa-icon-circle" cx="12" cy="12" r="10"></circle>
    <path class="sa-icon-question-body" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line class="sa-icon-question-dot" x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>`,

  action: `<svg class="sa-icon-svg sa-icon-action" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>`,

  undo: `<svg class="sa-icon-svg sa-icon-undo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="1 4 1 10 7 10"></polyline>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
  </svg>`,

  close: `<svg class="sa-icon-svg sa-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>`,
};

export function getIcon(type: AlertType | 'close', customIcon?: string): string {
  if (customIcon) return customIcon;
  return ICONS[type] || ICONS.info;
}
