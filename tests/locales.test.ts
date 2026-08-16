import { describe, it, expect } from 'vitest';
import { alert } from '../src';

describe('SajiloAlert - Language & Locales', () => {
  it('defaults to Nepali language strings for system labels', () => {
    alert.setLanguage('ne');
    expect(alert.getLanguage()).toBe('ne');

    alert.success({});
    expect(document.querySelector('.sa-title')?.textContent).toBe('सफल भयो!');
  });

  it('switches to English when setLanguage is en', () => {
    alert.setLanguage('en');
    expect(alert.getLanguage()).toBe('en');

    alert.success({});
    expect(document.querySelector('.sa-title')?.textContent).toBe('Success');

    alert.error({});
    expect(document.querySelector('.sa-title')?.textContent).toBe('Error');
  });

  it('never modifies or translates user provided custom messages', () => {
    alert.setLanguage('en');
    alert.info('यो नेपाली सन्देश हो');
    expect(document.querySelector('.sa-message')?.textContent).toBe('यो नेपाली सन्देश हो');
  });
});
