import { describe, it, expect, vi } from 'vitest';
import { alert } from '../src';

describe('SajiloAlert - Basic Alerts & Management', () => {
  it('creates a success alert modal with proper elements', () => {
    const id = alert.success('काम सफल भयो!');
    expect(id).toBeDefined();

    const backdrop = document.querySelector('.sa-backdrop');
    expect(backdrop).not.toBeNull();

    const message = document.querySelector('.sa-message');
    expect(message?.textContent).toBe('काम सफल भयो!');

    const icon = document.querySelector('.sa-icon-type-success');
    expect(icon).not.toBeNull();
  });

  it('creates error, warning, and info alerts', () => {
    alert.error('केही समस्या भयो!');
    expect(document.querySelector('.sa-icon-type-error')).not.toBeNull();
    expect(document.querySelector('.sa-message')?.textContent).toBe('केही समस्या भयो!');

    alert.warning('कृपया फेरि जाँच गर्नुहोस्!');
    expect(document.querySelector('.sa-icon-type-warning')).not.toBeNull();
    expect(document.querySelector('.sa-message')?.textContent).toBe('कृपया फेरि जाँच गर्नुहोस्!');

    alert.info('नयाँ जानकारी उपलब्ध छ!');
    expect(document.querySelector('.sa-icon-type-info')).not.toBeNull();
    expect(document.querySelector('.sa-message')?.textContent).toBe('नयाँ जानकारी उपलब्ध छ!');
  });

  it('creates loading alert that stays until updated or closed', () => {
    const id = alert.loading('प्रक्रिया भइरहेको छ...');
    expect(document.querySelector('.sa-icon-type-loading')).not.toBeNull();
    expect(document.querySelector('.sa-message')?.textContent).toBe('प्रक्रिया भइरहेको छ...');

    // Update the loading alert
    const updated = alert.update(id, {
      type: 'success',
      message: 'अपलोड सफल भयो!',
    });
    expect(updated).toBe(true);
    expect(document.querySelector('.sa-icon-type-success')).not.toBeNull();
    expect(document.querySelector('.sa-message')?.textContent).toBe('अपलोड सफल भयो!');
  });

  it('prevents duplicates when developer specifies custom ID', () => {
    alert.loading('बचत हुँदैछ...', { id: 'save-task' });
    expect(document.querySelectorAll('.sa-backdrop').length).toBe(1);

    // Call again with same ID
    alert.loading('अझै बचत हुँदैछ...', { id: 'save-task' });
    expect(document.querySelectorAll('.sa-backdrop').length).toBe(1);
    expect(document.querySelector('.sa-message')?.textContent).toBe('अझै बचत हुँदैछ...');
  });

  it('allows manual closing of alerts', async () => {
    vi.useFakeTimers();
    const id = alert.info('Temporary alert');
    expect(document.querySelector('.sa-backdrop')).not.toBeNull();

    alert.close(id);
    vi.advanceTimersByTime(300);

    expect(document.querySelector('.sa-backdrop')).toBeNull();
    vi.useRealTimers();
  });

  it('supports global configuration changes', () => {
    alert.configure({
      theme: 'dark',
      position: 'top',
    });

    alert.info('Dark top alert');
    const backdrop = document.querySelector('.sa-backdrop');
    expect(backdrop?.classList.contains('sa-theme-dark')).toBe(true);
    expect(backdrop?.classList.contains('sa-pos-top')).toBe(true);
  });
});
