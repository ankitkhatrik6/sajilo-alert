import { describe, it, expect, vi } from 'vitest';
import { alert } from '../src';

describe('SajiloAlert - Toast Notifications', () => {
  it('creates toast notifications for success, error, warning, info, and loading', () => {
    alert.toast.success('बचत भयो!');
    alert.toast.error('त्रुटि भयो');
    alert.toast.warning('सावधान');
    alert.toast.info('नयाँ सन्देश');

    const toasts = document.querySelectorAll('.sa-toast');
    expect(toasts.length).toBe(4);

    expect(document.querySelector('.sa-toast-icon.sa-icon-type-success')).not.toBeNull();
    expect(document.querySelector('.sa-toast-icon.sa-icon-type-error')).not.toBeNull();
    expect(document.querySelector('.sa-toast-icon.sa-icon-type-warning')).not.toBeNull();
    expect(document.querySelector('.sa-toast-icon.sa-icon-type-info')).not.toBeNull();
  });

  it('enforces maximum toast limit', () => {
    alert.configure({ maxToasts: 3 });

    alert.toast.info('Toast 1');
    alert.toast.info('Toast 2');
    alert.toast.info('Toast 3');
    alert.toast.info('Toast 4');

    const toasts = document.querySelectorAll('.sa-toast');
    expect(toasts.length).toBeLessThanOrEqual(3);
  });

  it('updates existing toast in place', () => {
    const toastId = alert.toast.loading('लोडिङ...', { id: 'test-toast' });
    expect(document.querySelector('.sa-toast-message')?.textContent).toBe('लोडिङ...');

    alert.update(toastId, {
      type: 'success',
      message: 'तयार भयो!',
    });

    expect(document.querySelector('.sa-toast-message')?.textContent).toBe('तयार भयो!');
    expect(document.querySelector('.sa-toast-icon.sa-icon-type-success')).not.toBeNull();
  });
});
