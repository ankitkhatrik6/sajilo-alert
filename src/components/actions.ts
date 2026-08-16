import type { UndoOptions, ActionOptions, AlertOptions } from '../core/types';
import { generateId } from '../utils/id';
import { createModal } from './modal';
import { createToast } from './toast';
import { state } from '../core/state';

/**
 * Dispatches an Action Alert (dialog or toast with action button).
 */
export function handleAction(options: ActionOptions, isToast = false): string {
  const id = options.id || generateId('sa-act');
  const alertOptions: AlertOptions = {
    ...options,
    id,
    type: 'action',
    showClose: options.showClose !== undefined ? options.showClose : true,
    closeOnEscape: options.closeOnEscape !== undefined ? options.closeOnEscape : true,
    closeOnBackdrop: options.closeOnBackdrop !== undefined ? options.closeOnBackdrop : true,
  };

  if (isToast) {
    createToast(alertOptions, id);
  } else {
    createModal(alertOptions, id);
  }

  return id;
}

/**
 * Dispatches an Undo Alert with strict single-execution guarantee.
 */
export function handleUndo(options: UndoOptions, isToast = true): string {
  const id = options.id || generateId('sa-undo');
  let undoCalled = false;

  const safeOnUndo = () => {
    if (undoCalled) return;
    undoCalled = true;
    if (typeof options.onUndo === 'function') {
      options.onUndo();
    }
  };

  const alertOptions: AlertOptions = {
    ...options,
    id,
    type: 'undo',
    duration: options.duration !== undefined ? options.duration : 5000,
    onUndo: safeOnUndo,
    showClose: true,
  };

  if (isToast) {
    createToast(alertOptions, id);
  } else {
    createModal(alertOptions, id);
  }

  return id;
}
