import type { GlobalConfig, AlertInstance, Position } from './types';

export const defaultConfig: GlobalConfig = {
  theme: 'nepal',
  position: 'center',
  toastPosition: 'top-right',
  duration: 4000,
  toastDuration: 4000,
  closeOnEscape: true,
  closeOnBackdrop: true,
  language: 'ne',
  maxToasts: 5,
};

class StateStore {
  public config: GlobalConfig = { ...defaultConfig };
  public activeModal: AlertInstance | null = null;
  public activeToasts: Map<string, AlertInstance> = new Map();
  public toastContainers: Map<Position, HTMLElement> = new Map();

  public reset(): void {
    this.config = { ...defaultConfig };
    this.activeModal = null;
    this.activeToasts.clear();
    this.toastContainers.clear();
  }
}

export const state = new StateStore();
