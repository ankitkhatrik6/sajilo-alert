import { beforeEach, afterEach } from 'vitest';
import { state } from '../src/core/state';

beforeEach(() => {
  document.body.innerHTML = '';
  state.reset();
});

afterEach(() => {
  document.body.innerHTML = '';
  state.reset();
});
