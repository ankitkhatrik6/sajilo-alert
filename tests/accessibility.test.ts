import { describe, it, expect, vi } from 'vitest';
import { alert } from '../src';

describe('SajiloAlert - Accessibility & Focus Management', () => {
  it('applies proper ARIA roles and labels to modals and toasts', () => {
    alert.error({
      title: 'Failed Transaction',
      message: 'Insufficient balance',
    });

    const modal = document.querySelector('.sa-modal');
    expect(modal?.getAttribute('role')).toBe('alertdialog');
    expect(modal?.getAttribute('aria-modal')).toBe('true');
    expect(modal?.hasAttribute('aria-labelledby')).toBe(true);
    expect(modal?.hasAttribute('aria-describedby')).toBe(true);

    alert.toast.info('Info notice');
    const toast = document.querySelector('.sa-toast');
    expect(toast?.getAttribute('role')).toBe('status');
  });

  it('restores focus to previously active element on close', async () => {
    vi.useFakeTimers();

    const triggerButton = document.createElement('button');
    triggerButton.id = 'trigger-btn';
    document.body.appendChild(triggerButton);
    triggerButton.focus();

    expect(document.activeElement).toBe(triggerButton);

    const alertId = alert.info('Testing focus restoration');
    expect(document.querySelector('.sa-backdrop')).not.toBeNull();

    alert.close(alertId);
    vi.advanceTimersByTime(300);

    expect(document.activeElement).toBe(triggerButton);
    vi.useRealTimers();
  });
});
