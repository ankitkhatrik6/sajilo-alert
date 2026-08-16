import { describe, it, expect, vi } from 'vitest';
import { alert } from '../src';

describe('SajiloAlert - Confirmation Dialog', () => {
  it('resolves true when confirm button is clicked', async () => {
    const promise = alert.confirm({
      title: 'खाता हटाउने?',
      message: 'यो कार्य फिर्ता गर्न सकिँदैन।',
      confirmText: 'हटाउनुहोस्',
      cancelText: 'रद्द गर्नुहोस्',
    });

    const confirmBtn = document.querySelector<HTMLButtonElement>('.sa-btn-primary');
    expect(confirmBtn).not.toBeNull();
    expect(confirmBtn?.textContent).toBe('हटाउनुहोस्');

    confirmBtn?.click();

    const result = await promise;
    expect(result).toBe(true);
  });

  it('resolves false when cancel button is clicked', async () => {
    const promise = alert.confirm({
      title: 'के तपाईं निश्चित हुनुहुन्छ?',
      message: 'रद्द गर्न यहाँ थिच्नुहोस्।',
    });

    const cancelBtn = document.querySelector<HTMLButtonElement>('.sa-btn-secondary');
    expect(cancelBtn).not.toBeNull();

    cancelBtn?.click();

    const result = await promise;
    expect(result).toBe(false);
  });

  it('resolves false when escape key is pressed', async () => {
    const promise = alert.confirm({
      title: 'Escape test',
      message: 'Press escape to cancel',
      closeOnEscape: true,
    });

    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    document.dispatchEvent(event);

    const result = await promise;
    expect(result).toBe(false);
  });

  it('resolves false when backdrop is clicked', async () => {
    const promise = alert.confirm({
      title: 'Backdrop test',
      message: 'Click backdrop to cancel',
      closeOnBackdrop: true,
    });

    const backdrop = document.querySelector<HTMLElement>('.sa-backdrop');
    backdrop?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const result = await promise;
    expect(result).toBe(false);
  });
});
