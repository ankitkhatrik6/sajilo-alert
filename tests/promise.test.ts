import { describe, it, expect } from 'vitest';
import { alert } from '../src';

describe('SajiloAlert - Promise Handling', () => {
  it('handles fulfilled promises by displaying success state and returning result', async () => {
    const asyncAction = new Promise<{ id: number; name: string }>((resolve) => {
      setTimeout(() => resolve({ id: 101, name: 'Ram' }), 50);
    });

    const result = await alert.promise(asyncAction, {
      loading: 'प्रक्रिया भइरहेको छ...',
      success: (data) => `काम सफल भयो: ${data.name}!`,
      error: 'काम असफल भयो!',
    });

    expect(result).toEqual({ id: 101, name: 'Ram' });
    expect(document.querySelector('.sa-icon-type-success')).not.toBeNull();
    expect(document.querySelector('.sa-message')?.textContent).toBe('काम सफल भयो: Ram!');
  });

  it('handles rejected promises without swallowing the error', async () => {
    const failingAction = new Promise<string>((_, reject) => {
      setTimeout(() => reject(new Error('Network disconnected')), 50);
    });

    await expect(
      alert.promise(failingAction, {
        loading: 'प्रक्रिया भइरहेको छ...',
        success: 'काम सफल भयो!',
        error: (err) => `त्रुटि: ${(err as Error).message}`,
      })
    ).rejects.toThrow('Network disconnected');

    expect(document.querySelector('.sa-icon-type-error')).not.toBeNull();
    expect(document.querySelector('.sa-message')?.textContent).toBe('त्रुटि: Network disconnected');
  });
});
